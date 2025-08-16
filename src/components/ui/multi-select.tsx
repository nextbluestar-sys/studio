"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

export type MultiSelectOption = {
  value: string
  label: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  selected: string[]
  onChange: (selected: string[]) => void
  className?: string
  placeholder?: string
}

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  ({ options, selected, onChange, className, placeholder = "Select options..." }, ref) => {
    const [open, setOpen] = React.useState(false)

    const handleSelect = (value: string) => {
      onChange([...selected, value])
    }

    const handleDeselect = (value: string) => {
      onChange(selected.filter((s) => s !== value))
    }

    const selectedLabels = selected
      .map(value => options.find(option => option.value === value)?.label)
      .filter(Boolean);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between h-auto", selected.length > 0 ? "py-1" : "py-2", className)}
            onClick={() => setOpen(!open)}
          >
            <div className="flex gap-1 flex-wrap">
              {selectedLabels.length > 0 ? (
                selectedLabels.map((label) => (
                  <Badge
                    variant="secondary"
                    key={label}
                    className="mr-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      const valueToDeselect = options.find(o => o.label === label)?.value;
                      if (valueToDeselect) {
                        handleDeselect(valueToDeselect);
                      }
                    }}
                  >
                    {label}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search options..." />
            <CommandList>
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (selected.includes(option.value)) {
                        handleDeselect(option.value);
                      } else {
                        handleSelect(option.value);
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
)

MultiSelect.displayName = "MultiSelect"

export { MultiSelect }