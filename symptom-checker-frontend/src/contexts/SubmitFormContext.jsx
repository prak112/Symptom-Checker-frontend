// react
import PropTypes from 'prop-types'
import { createContext, useState } from "react"

export const SubmitFormContext = createContext()

export function SubmitFormProvider({ children }) {
    const [submitted, setSubmitted] = useState(false)

    return (
        <SubmitFormContext.Provider value={{ submitted, setSubmitted }}>
            {children}
        </SubmitFormContext.Provider>
    )
}

SubmitFormProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
