import React, { PropsWithoutRef } from "react"
import { useField } from "react-final-form"

export interface LabeledNumberFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledNumberField = React.forwardRef<HTMLInputElement, LabeledNumberFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField<number>(name, {
      parse: (value) => Number(value),
      format: (value) => value?.toString(),
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <div className="mt-2" {...outerProps}>
        <label>
          {label}
          <input
            className="border border-black ml-2 p-1"
            {...input}
            type="number"
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

export default LabeledNumberField
