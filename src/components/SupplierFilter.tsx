import { useEffect, useRef } from 'react'
import type { FilterDefinition } from '../features/suppliers/types'
import styles from './SupplierFilter.module.css'

interface SupplierFilterProps {
  definition: FilterDefinition
  selected: string[]
  open: boolean
  disabled: boolean
  isAvailable: (value: string) => boolean
  onOpen: (open: boolean) => void
  onChange: (values: string[]) => void
}

export function SupplierFilter({ definition, selected, open, disabled, isAvailable, onOpen, onChange }: SupplierFilterProps) {
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLFieldSetElement>(null)
  const close = useRef(onOpen)
  useEffect(() => { close.current = onOpen }, [onOpen])
  useEffect(() => {
    if (!open) return
    panel.current?.querySelector<HTMLInputElement>('input:not(:disabled)')?.focus()
    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) close.current(false)
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [open])

  const panelId = 'supplier-filter-' + definition.id
  return (
    <div ref={root} className={styles.root}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) onOpen(false) }}
      onKeyDown={event => {
        if (event.key === 'Escape' && open) { event.preventDefault(); event.stopPropagation(); onOpen(false); trigger.current?.focus() }
      }}>
      <button ref={trigger} type="button" disabled={disabled} className={styles.trigger} aria-expanded={open} aria-controls={panelId}
        title={disabled ? 'Сначала выберите металл' : undefined} onClick={() => onOpen(!open)}>
        {definition.label}{selected.length > 0 && <span> ({selected.length})</span>} <span aria-hidden="true">▾</span>
      </button>
      <fieldset ref={panel} id={panelId} hidden={!open} className={styles.panel}>
        <legend className={styles.legend}>{definition.label}</legend>
        {definition.options.map(choice => {
          const available = isAvailable(choice.label)
          const checked = selected.includes(choice.label)
          return <label key={choice.label} className={styles.option}>
            <input type="checkbox" name={definition.id} value={choice.label} disabled={!available} checked={checked}
              onChange={() => onChange(checked ? selected.filter(value => value !== choice.label) : [...selected, choice.label])} />
            <span>{choice.label}{!available && <small> — пока недоступно</small>}</span>
          </label>
        })}
        <button type="button" className={styles.clear} onClick={() => onChange([])}>{['origin', 'format'].includes(definition.id) ? 'Не имеет значения' : 'Любой вариант'}</button>
        <button type="button" className={styles.close} onClick={() => { onOpen(false); trigger.current?.focus() }}>Закрыть</button>
      </fieldset>
    </div>
  )
}
