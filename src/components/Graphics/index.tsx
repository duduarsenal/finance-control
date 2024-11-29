import { currencyFormatPT } from "@utils";
import { GraphicsBar, GraphicsDonut, Loading, Select, Switch } from "@components";
import { CategoriaProps, GenericProps, GraphicsProps } from "@typings";

export function Graphics({
  year,
  setYear,
  month,
  setMonth,
  months,
  monthSelected,
  loadingBar,
  loadingDonut,
  ganhosByYear,
  gastosByYear,
  categoriasByMonth,
  typeGraphicDonut,
  setTypeGraphicDonut,
}: GraphicsProps) {

  const selectYears = () => { 
    const arr: GenericProps[] = []
    let anoAtual = new Date().getFullYear() - 4
    
    for (let i = 0; i <= 9; i++) {
      if (i == 0) {
        arr.push({label: (anoAtual).toString(), value: (anoAtual).toString()})
      } else if(i % 2 == 0){
        anoAtual -= 5;
        anoAtual += 1;
        arr.push({label: (anoAtual).toString(), value: (anoAtual).toString()})
      } else {
        anoAtual += 5;
        arr.push({label: (anoAtual).toString(), value: (anoAtual).toString()})
      }
    }
    return arr;
  }
  
  function calcPorcentagem(valor: number, total: number[]) {
    if (!valor) return 0;

    const somaTotal = total.reduce((soma, iterador) => soma + iterador, 0);

    return Math.round((valor * 100) / somaTotal)
  }

  return (
    <div className="flex flex-col gap-10 py-6">
      <h4 className="text-[24px] font-semibold bg-brand-background px-4 py-1 rounded-md m-auto">
        Gráficos
      </h4>

      {/* ------------------------------------------------- GRAFICO DE PIZZA MENSAL ---------------------------------------------------------- */}
      <div className="flex flex-wrap items-center justify-between w-full h-full gap-x-6 gap-y-2 lg:justify-center">
        <div className="graphic-media relative flex flex-col items-center w-full gap-6 p-4 rounded-md bg-brand-background lg:max-w-[750px] max-w-[600px]">
          {/* SELECT E LABELS */}
          <div className="flex items-center justify-between w-full">
            <div className="w-max">
              <Select
                value={
                  (monthSelected
                    ? monthSelected
                    : month
                    ? month
                    : months.find(
                        (mes) => Number(mes.value) === new Date().getMonth() + 1
                      )) as CategoriaProps
                }
                setValue={setMonth}
                optionDefault="Selecione um mês"
                options={months}
                transparent={false}
                className="min-w-[200px]"
                clearable={false}
              />
            </div>
            <h4 className="font-normal text-[20px]">Estatisticas do Mês</h4>
            {/* SWITCH GASTOS/GANHOS */}
            <Switch
              type="text"
              option1={{
                label: "Ganhos",
                className: "text-brand-green font-bold",
              }}
              option2={{
                label: "Gastos",
                className: "text-brand-red font-bold",
              }}
              action1={() => setTypeGraphicDonut("ganhos")}
              action2={() => setTypeGraphicDonut("gastos")}
              className="py-2"
            />
          </div>
          {/* GRÁFICO */}
          <div className="min-h-[370px] flex items-center">
            {loadingDonut ? (
              <Loading
                isTrue={loadingDonut}
                className="absolute top-0 left-0 w-full h-full row-span-1 loading-not"
              />
            ) : (
              <GraphicsDonut
                data={
                  categoriasByMonth?.length
                    ? categoriasByMonth
                    : [{ label: "", value: 3141592653589793, color: "var(--gray-opacity)" }]
                }
              />
            )}
          </div>
        </div>
        {/* INFORMAÇÕES DO GRÁFICO */}
        <div className="flex flex-col xl:max-w-[400px] max-w-full xl:mx-0 sm:max-w-[650px] w-full px-8">
          <h4 className="flex flex-col items-center gap-1 py-4 font-semibold leading-4">
            Maior {typeGraphicDonut.slice(0, -1)} do mês:
            <p className="flex items-center gap-2 px-4 py-2 font-medium truncate rounded-md bg-brand-background">
              {categoriasByMonth?.length ?
              <>
                <span
                  style={{
                    backgroundColor: Array.from(categoriasByMonth || []).sort(
                      (a, b) => b.value - a.value
                    )[0]?.color,
                  }}
                  className="w-4 h-4 rounded-sm"
                />
                <span>
                  {
                    Array.from(categoriasByMonth || []).sort(
                      (a, b) => b.value - a.value
                    )[0]?.label
                  }
                </span>
                <span>
                  {`- ${calcPorcentagem(
                    Array.from(categoriasByMonth || []).sort(
                      (a, b) => b.value - a.value
                    )[0]?.value,
                    categoriasByMonth
                      ?.sort((a, b) => a.value - b.value)
                      .map((c) => c.value) || []
                  )}%`}
                </span>
                <span className="text-brand-text">{`(${currencyFormatPT(
                  Array.from(categoriasByMonth || []).sort(
                    (a, b) => b.value - a.value
                  )[0]?.value
                )})`}</span>
              </>
              : <span className="font-normal text-brand-text">Sem registros...</span>}
            </p>
          </h4>
          {categoriasByMonth?.length ?
          <div className="flex flex-col flex-wrap lg:flex-row gap-x-3 gap-y-[.05rem]">
            {categoriasByMonth?.sort((a, b) => b.value - a.value).map((categInfo, index) => (
              <div
                className="flex items-center justify-start gap-2 w-full"
                key={index}
              >
                <span
                  style={{ backgroundColor: categInfo.color }}
                  className="w-4 h-4 rounded-sm"
                />
                {categInfo.label}
                {" - "}
                <span>
                  {calcPorcentagem(
                    categInfo.value,
                    categoriasByMonth
                      .sort((a, b) => b.value - a.value)
                      .map((c) => c.value)
                  )}
                  {"% "}
                  <span className="text-brand-text">
                  </span>
                </span>
              </div>
            ))}
          </div> : ""}
        </div>
      </div>

      {/* ------------------------------------------------- GRÁFICO DE BARRAS DO ANO ----------------------------------------------------- */}
      <div className="flex flex-wrap-reverse items-center justify-center w-full h-full gap-x-6">
        {/* INFORMAÇÕES DO GRÁFICO */}
        <div className="flex flex-col xl:max-w-[400px] m-auto lg:items-center max-w-full xl:mx-0 sm:max-w-[650px] w-full">
          <div className="flex flex-col items-start w-full py-4 leading-5 text-[18px]">
            <h4 className="flex gap-2 font-semibold">
              Maior ganho do Ano:
              <span className="font-medium text-brand-green">
                {currencyFormatPT([...ganhosByYear].sort((a, b) => b - a)[0]) ||
                  "-"}
              </span>
            </h4>
            <h4 className="flex gap-2 font-semibold">
              Maior gasto do Ano:
              <span className="font-medium text-brand-red">
                {currencyFormatPT([...gastosByYear].sort((a, b) => b - a)[0]) ||
                  "-"}
              </span>
            </h4>
          </div>
          <div className="flex flex-wrap items-center justify-start w-full h-full max-h-full gap-y-2">
            {Array(12)
              .fill(0)
              .map((_, index) => (
                <div className="flex items-center basis-1/3" key={index}>
                  <div className="w-[90%] flex flex-col items-center justify-center py-2 rounded-md bg-brand-dark-gray overflow-hidden">
                    <span className="font-bold text-brand-text">
                      {
                        months.find((month) => Number(month.value) == index + 1)
                          ?.label
                      }
                    </span>
                    <div className="flex flex-col leading-none text-center truncate">
                      <span className="font-semibold text-brand-green">
                        {currencyFormatPT(ganhosByYear[index]) || "-"}
                      </span>
                      <span className="font-semibold text-brand-red">
                        {currencyFormatPT(gastosByYear[index]) || "-"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="graphic-media relative flex flex-col items-center w-full gap-6 p-4 rounded-md bg-brand-dark-gray lg:max-w-[750px] max-w-[600px]">
          {/* SELLECT E LABELS */}
          <div className="flex items-center justify-between w-full">
            <div className="w-max">
              <Select
                value={year as CategoriaProps}
                setValue={setYear}
                optionDefault={new Date().getFullYear().toString()}
                options={selectYears()}
                transparent={false}
                className="min-w-[160px]"
                clearable={false}
              />
            </div>
            <h4 className="font-normal text-[20px]">Estatisticas Anuais</h4>
            <div className="flex gap-4">
              <div className="flex gap-2">
                <span className="w-6 h-6 rounded-md bg-brand-green" />
                <span className="font-semibold text-brand-text">
                  Ganhos
                </span>
              </div>
              <div className="flex gap-2">
                <span className="w-6 h-6 rounded-md bg-brand-red" />
                <span className="font-semibold text-brand-text">
                  Gastos
                </span>
              </div>
            </div>
          </div>
          {/* GRÁFICO */}
          <div className="min-h-[370px] h-[370px] flex items-center overflow-hidden">
            {loadingBar ? (
              <Loading
                isTrue={loadingBar}
                className="absolute top-0 left-0 w-full h-full row-span-1 loading-not"
              />
            ) : (
              <GraphicsBar
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                colTypes={[...months].sort((a: any, b: any) => a.value - b.value).map((month) => month.label.slice(0, 3))}
                gastos={gastosByYear}
                ganhos={ganhosByYear}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
