import React from "react";

export default interface CheckBox {
    label :string,
    onChanged: (event: React.ChangeEvent<HTMLInputElement>) => void
}