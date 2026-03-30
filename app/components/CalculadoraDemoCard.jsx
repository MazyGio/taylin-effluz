export default function CalculadoraDemoCard({
    title,
    subtitle,
    children,
    className = '',
    headerClassName = 'bg-primary',
    bodyClassName = 'bg-lightGray1',
    contentClassName = '',
    minHeightClassName = '',
}) {
    return (
        <section className={`relative w-full pt-12 ${className}`}>
            <div className="absolute inset-x-4 top-4 z-10 flex justify-center">
                <div className={`max-w-3xl rounded-xl ${headerClassName} px-6 py-2 text-center text-white shadow-xl`}>
                    <h2 className="text-md font-extrabold">{title}</h2>
                    {subtitle ? (
                        <p className="text-xs font-medium text-accent2">
                            {subtitle}
                        </p>
                    ) : null}
                </div>
            </div>

            <div
                className={`flex flex-col overflow-hidden rounded-3xl rounded-tr-[3rem] rounded-bl-[3rem] px-6 pb-8 pt-12 ${minHeightClassName} ${bodyClassName}`}
            >
                <div className={`h-full ${contentClassName}`}>
                    {children}
                </div>
            </div>
        </section>
    );
}
