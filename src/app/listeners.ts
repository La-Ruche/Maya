interface ListenerInterface {
    name: string
    once?: boolean
    run: (...args: any[]) => void
}

export class Listener {

    public static new(params: ListenerInterface) {}

}
