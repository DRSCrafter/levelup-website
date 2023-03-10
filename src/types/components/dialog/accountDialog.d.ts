import Dialog from "./dialog";

export default interface AccountDialog extends Dialog {
    onCharge: (amount: number) => void
}