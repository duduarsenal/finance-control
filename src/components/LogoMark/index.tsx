import dfLogo from '/df-logo-white.png';
import dfLogoBlack from '/df-logo-black.png';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function LogoMark({theme}: any) {
    return (
        <>
            <div className="flex items-center justify-center max-w-[500px] h-full gap-2">
                {theme === "dark"
                ? <img
                    src={dfLogo}
                    alt="Logo tipo Finance Control"
                    className="h-full max-w-32 brightness-90"
                />
                : <img
                    src={dfLogoBlack}
                    alt="Logo tipo Finance Control"
                    className="h-full max-w-32 brightness-90"
                />}
                <h2 className="mx-auto text-[30px] font-[500] text-brand-text">Finance Control</h2>
            </div>
        </>
    )
}