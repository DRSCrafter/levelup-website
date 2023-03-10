export default interface Counter {
    value: number,
    onChange: (value: number) => void,
    maxValue: number
}