import "./menu.scss";

export default function Menu({isOpen}:{isOpen:boolean}) {
    return (
        <section className={`menu ${isOpen?"active":""}`}>
            <div>
                MENU
            </div>
        </section>
    )
}