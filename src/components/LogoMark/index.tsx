import dfLogo from '/df-logo-white.png';

export function LogoMark() {
    return (
        <>
            <div className="flex items-center justify-center max-w-[500px] h-full gap-2">
                <img
                    src={dfLogo}
                    alt="Logo tipo Dudu finance"
                    className="h-full max-w-32"
                />
                <h2 className="mx-auto text-[30px] font-[500]">Dudu Finance</h2>
            </div>
        </>
    )
}