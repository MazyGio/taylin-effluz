export function RestrictedContentByTags({children, customer, allowedTags}) {

    if (!customer.tags.some(tag => allowedTags.includes(tag))) {
        return <p>Acceso denegado</p>;
    }

    return (
        <div>{children}</div>
    )
}