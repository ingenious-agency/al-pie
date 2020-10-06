import React, { PropsWithoutRef } from "react"
import { useField } from "react-final-form"
import { format } from "date-fns"

export interface LabeledDateFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledDateField = React.forwardRef<HTMLInputElement, LabeledDateFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField<any>(name, {
      parse: (value) => new Date(value),
      format: (value) => (value ? format(value, "yyyy-MM-dd") : ""),
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <div className="mt-2" {...outerProps}>
        <label>
          {label}
          <input
            className="border border-black ml-2 p-1"
            {...input}
            type="date"
            disabled={submitting}
            {...props}
            ref={ref}
          />
        </label>

        {touched && normalizedError && <div role="alert">{normalizedError}</div>}
      </div>
    )
  }
)

export default LabeledDateField
