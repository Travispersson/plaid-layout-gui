
export const ExperimentConfig = {
    fields: {
        num_rows: {
            minValidSize: {
                value: 1,
                message: "Rows must be a number > 0",
            },
        },
        num_cols: {
            minValidSize: {
                value: 1,
                message: "Columns must be a number > 0",
            },
        },
        vertical_cell_lines: {
            minValidSize: {
                value: 1,
                message: "Cell line must be a number > 0",
            },
        },
        horizontal_cell_lines: {
            minValidSize: {
                value: 1,
                message: "Cell line must be a number > 0",
            },
        },
        replicates_on_different_plates: {
            isAlsoChecked: {
                value: ExperimentForm.replicates_on_same_plate,
                message:
                    "Replicates on different and same plates cannot be checked at the same time",
            },
        },
        size_empty_edge: {
            minValidSize: {
                value: 0,
                message: "Empty edges must be a number >= 0",
            },
        },
    }
}

export const CompoundConfig = {
    fields: {
        compounds: {
            minValidSize: {
                value: 1,
                message: "Compounds must be a number > 0",
            },
        },
        compound_names: {
            minValidLength: {
                value: formState.compounds,
                message:
                    "Number of compound names are not equal to number of compounds",
            },
        },
        compound_replicates: {
            minValidLength: {
                value: formState.compounds,
                message: "Number of replicates does not match number of compounds",
            },
        },
        compound_concentration_indicators: {
            maxNumber: {
                value: formState.compound_concentrations,
                message: "Number of indicators does not match number of compounds",
            },
        },
    }
}
export const ValidationConfig = {
    fields: {
        num_controls: {
            minValidSize: {
                value: 0,
                message: "Number of controls must be a number >= 0",
            },
        },
        control_names: {
            minValidLength: {
                value: formState.num_controls,
                message:
                    "The number of control names must match the number of controls",
            },
        },
        control_concentrations: {
            minValidLength: {
                value: formState.num_controls,
                message: "Number of control concentrations must be >= 0",
            },
        },
        control_concentration_names: {
            minValidSize: {
                value: 0,
                message: "",
            },
        },
        control_replicates: {
            minValidLength: {
                value: formState.num_controls,
                message:
                    "Number of control replicates must match the number of controls",
            },
        },
    },
}