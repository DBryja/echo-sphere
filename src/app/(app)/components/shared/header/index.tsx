import "./header.scss";

export default function Header({children}: {children?: React.ReactNode}) {
    return <header className={"header"} data-state={"nav"}>
        {children}
    </header>
}

