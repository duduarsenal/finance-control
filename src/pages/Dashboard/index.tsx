import { getCampos, getCategorias, saveCampos, saveCategorias } from "@api";
import {
  Button,
  DashboardTable,
  GraphicsBar,
  GraphicsPie,
  Loading,
  ModalCategoria,
  Select,
  Switch,
} from "@components";
import {
  CamposProps,
  CategoriaProps,
  CategoriasGraficoProps,
  GenericProps,
  OutletContextProps,
} from "@typings";
import {
  Icons,
  cn,
  currencyFormatPT,
  months,
  campos as camposJSON,
  categorias as categoriasJSON
} from "@utils";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

export function Dashboard() {
  const [monthSelected, setMonthSelected] = useState<GenericProps | null>(null);
  const [modalCategoria, setModalCategoria] = useState<boolean>(false);

  const [categorias, setCategorias] = useState<CategoriaProps[]>(categoriasJSON);
  const [campos, setCampos] = useState<CamposProps[]>(camposJSON);

  const [totalGastos, setTotalGastos] = useState<number>(0);
  const [totalGanhos, setTotalGanhos] = useState<number>(0);

  const [saldoTotal, setSaldoTotal] = useState<number>(0);

  const [year, setYear] = useState<GenericProps | null>(null);
  const [month, setMonth] = useState<GenericProps | null>(null);

  const [loadindBar, setLoadindBar] = useState<boolean>(false);
  const [loadindDonut, setLoadindDonut] = useState<boolean>(false);

  const [ganhosByYear, setGanhosByYear] = useState<number[]>([])
  const [gastosByYear, setGastosByYear] = useState<number[]>([])

  const [typeGraphicDonut, setTypeGraphicDonut] = useState<string>("ganhos")

  const [categoriasByMonth, setCategoriasByMonth] = useState<CategoriasGraficoProps[] | null>(null)

  const { addNotification, setIsPageHeader, setIsLoading } = useOutletContext<OutletContextProps>();

  async function saveCategoria(values: CategoriaProps[]) {
    // SALVE LISTA DE CATEGORIAS NO LOCALSTORAGE
    await saveCategorias(values);
    // SALVA NOVA LISTA DE CATEGORIAS NO STATE
    setCategorias(await getCategorias());

    setModalCategoria(false);
    addNotification("sucess", "Categorias atualizas com sucesso.");
  }

  async function saveCampo(campo: CamposProps) {
    // SALVA LISTA DE CAMPOS NO LOCALSTORAGE
    await saveCampos([...(await getCampos()), campo]);
    // SALVA NOVA LISTA DE CAMPOS NO STATE
    setCampos(await getCampos());

    addNotification("sucess", `${campo.type === "gastos" ? "Gasto" : "Ganho"} adicionado com sucesso.`);
  }

  async function editCampo(campo: CamposProps) {
    // CRIA UMA NOVA LISTA DE CAMPOS COM O CAMPO EDITADO
    const novosCampos = (await getCampos()).map((c) => {
      if (c.id === campo.id) c = { ...campo };
      return c;
    });

    // SALVA NOVA LISTA NO LOCALSTORAGE/BACKEND
    await saveCampos(novosCampos);
    // SALVA NOVA LISTA DE CAMPOS NO STATE
    setCampos(await getCampos());

    addNotification("sucess", `${campo.type === "gastos" ? "Gasto" : "Ganho"} editado com sucesso.`);
  }

  async function removeCampo(campo: CamposProps) {
    //CRIA UMA NOVA LISTA DE CAMPOS REMOVENDO O CAMPO EXCLUIDO
    const novosCampos = (await getCampos()).filter((c) => c.id !== campo.id);

    // SALVA NOVA LISTA DE CAMPOS NO LOCALSTORAGE/BACKEND
    await saveCampos(novosCampos);
    // SALVA NOVA LISTA DE CAMPOS NO STATE
    setCampos(await getCampos());

    addNotification("sucess", `${campo.type === "gastos" ? "Gasto" : "Ganho"} removido com sucesso.`);
  }

  async function handleStates() {
    // SALVA LISTA DE CATEGORIAS NO STATE BUSCANDO DO LOCALSTORAGE/BACK
    setCategorias(categoriasJSON);
    // SALVA LISTA DE CAMPOS NO STATE BUSCANDO DO LOCALSTORAGE/BACK (APLICANDO FILTRO DE MÊS CASO ESTEJA SELECIONADO)
    setCampos(
      (monthSelected
        ? camposJSON.filter((campo) => campo.month == monthSelected?.value)
        : camposJSON
      ).sort((a, b) => new Date(a.dtadd).getTime() - new Date(b.dtadd).getTime())
    );

    setIsLoading(false);
  }

  // Busca os dados no LOCALSTORAGE AO CARREGAR A PAGE
  useEffect(() => {
    handleStates();
    setIsPageHeader(window.location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ATUALIZA OS STATES CASO ALGUM MÊS SEJA SELECIONADO NO FILTRO DE MÊS
  useEffect(() => {
    handleStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthSelected]);

  // SALVA SALDO TOTAL CASO SEJA ATUALIZADO ALGUM GASTO/GANHO
  useEffect(() => {
    setSaldoTotal(totalGanhos - totalGastos);
  }, [totalGanhos, totalGastos]);

  // MONITORA QUALQUER ATUALIZAÇÃO DE DADOS PARA ATUALIZAR O GRÁFICO
  useEffect(() => {
    // PROCESSA OS CAMPOS PARA EXIBIR NO GRAFICO ANUAL DE BARRAS
    function processarCamposByAno(campos: CamposProps[], tipo: string, setState: (values: number[]) => void) {
      setLoadindBar(true)
      const result: number[] = Array(12).fill(0);

      let camposFiltrados: CamposProps[] = campos;

      if (year) {
        camposFiltrados = camposFiltrados
          .filter((campo) => campo.data.split("-")[0] === year.value.toString())
      } else {
        camposFiltrados = camposFiltrados
          .filter((campo) => campo.data.split("-")[0] === new Date().getFullYear().toString())
      }

      camposFiltrados.forEach((campo) => {
        if (campo.type === tipo) {
          if (!isNaN(campo.valor)) {
            result[campo.month - 1] += campo.valor; // Ajusta o índice do mês (0 a 11) ~ (Jan a Dez)
          }
        }
      });

      setState(result);
      setLoadindBar(false)
    }

    processarCamposByAno(campos, "ganhos", setGanhosByYear)
    processarCamposByAno(campos, "gastos", setGastosByYear)
  }, [campos, categorias, totalGastos, totalGanhos, saldoTotal, year])

  // MONITORA QUALQUER ATUALIZAÇÃO DE DADOS PARA ATUALIZAR O GRÁFICO
  useEffect(() => {
    // PROCESSA OS CAMPOS PARA EXIBIR NO GRÁFICO MENSAL DE DONUT
    function processarCamposByMonth(campos: CamposProps[], tipo: string, setState: (values: CategoriasGraficoProps[]) => void) {

      setLoadindDonut(true)
      const cores = [
        { label: "yellow", value: "#ffc300" },
        { label: "red", value: "#D1001F" },
        { label: "orange", value: "#fe8f00" },
        { label: "pink", value: "#ff83b6" },
        { label: "purple", value: "#7542fe" },
        { label: "blue", value: "#1061ff" },
        { label: "bluemarin", value: "#198e7b" },
        { label: "green", value: "#89e23b" }
      ]

      const mesFiltro = monthSelected ? monthSelected.value : month ? month.value : Number(new Date().toISOString().split("-")[1])

      const camposByTipo = campos.filter((campo) => {
        if (campo.type === tipo && campo.month.toString() === mesFiltro.toString()) return campo
      })

      const camposFiltrados = camposByTipo.reduce((acc: CategoriasGraficoProps[], ct: CamposProps) => {

        const existingCampo = acc.find((campo) => campo.label === ct.categoria.label);

        if (existingCampo) {
          existingCampo.value += ct.valor;
        } else {
          acc.push(
            {
              label: ct.categoria.label,
              value: ct.valor,
              color: cores.find((cor) => cor.label === ct.categoria.cor?.value)?.value as string
            })
        }

        return acc
      }, [])

      setState(camposFiltrados)
      setLoadindDonut(false)
    }

    processarCamposByMonth(campos, typeGraphicDonut, setCategoriasByMonth)
  }, [campos, typeGraphicDonut, month, monthSelected])

  function calcPorcentagem(valor: number, total: number[]): number {

    if (!valor) return 0;

    const somaTotal = total.reduce((soma, iterador) => {
      return soma + iterador
    }, 0)

    return Math.round(((valor / somaTotal) * 100) * Math.pow(10, 1)) / Math.pow(10, 1);
  }

  return (
    <main className="px-2 overflow-y-hidden h-max">
      <div className="flex justify-between w-full py-8 h-max">
        <div className="flex items-center gap-6">
          <div className="w-56">
            <Select
              optionDefault="Selecione um mês"
              options={months}
              value={monthSelected as CategoriaProps}
              setValue={setMonthSelected}
              icon={<Icons.FaCalendarCheck className="text-brand-white" />}
              transparent={false}
            />
          </div>
          <h4 className="text-brand-white-gray text-[18px]">
            Saldo:{" "}
            <span
              className={cn("text-brand-white-gray", {
                "text-brand-red": saldoTotal < 0,
                "text-brand-green": saldoTotal > 0,
              })}
            >
              {currencyFormatPT(saldoTotal.toString()) || " R$ 0,00"}
            </span>
          </h4>
        </div>
        <Button
          handleButton={() => setModalCategoria(true)}
          value="Adicionar Categoria"
          className="px-4 my-0 w-max"
          icon={<Icons.FiPlusCircle className="text-[24px] text-brand-green" />}
        />
      </div>

      {/* DASHBOARD/TABLE DE GASTOS */}
      <DashboardTable
        type="gastos"
        campos={campos?.filter((campo) => campo.type === "gastos") || []}
        saveCampo={saveCampo}
        handleEditCampo={editCampo}
        removeCampo={removeCampo}
        categorias={categorias}
        setTotal={setTotalGastos}
      />

      {/* DASHBOARD/TABLE DE GANHOS */}
      <DashboardTable
        type="ganhos"
        campos={campos?.filter((campo) => campo.type === "ganhos") || []}
        saveCampo={saveCampo}
        handleEditCampo={editCampo}
        removeCampo={removeCampo}
        categorias={categorias}
        setTotal={setTotalGanhos}
      />

      {/* MODAL PARA ADICIONAR CATEGORIA */}
      {modalCategoria && (
        <ModalCategoria
          setModalCategoria={setModalCategoria}
          categorias={categorias || []}
          saveCategorias={saveCategoria}
        />
      )}

      {/* ------------------------------------------ GRÁFICOS -------------------------------------- */}
      <div className="flex flex-col gap-10 py-6">
        <h4 className="text-[24px] font-semibold bg-brand-dark-gray px-4 py-1 rounded-md m-auto">
          Gráficos
        </h4>

        {/* GRAFICO DE PIZZA MENSAL */}
        <div className="flex flex-wrap items-center justify-between w-full h-full gap-x-6 gap-y-2 lg:justify-center">
          <div className="graphic-media relative flex flex-col items-center w-full gap-6 p-4 rounded-md bg-brand-dark-gray lg:max-w-[750px] max-w-[600px]">
            {/* SELECT E LABELS */}
            <div className="flex items-center justify-between w-full">
              <div className="w-max">
                <Select
                  value={(monthSelected ? monthSelected : month ? month : months.find((mes) => Number(mes.value) === (new Date().getMonth() + 1))) as CategoriaProps}
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
                option1={{ label: "Ganhos", className: "text-brand-green font-bold" }}
                option2={{ label: "Gastos", className: "text-brand-red font-bold" }}
                action1={() => setTypeGraphicDonut("ganhos")}
                action2={() => setTypeGraphicDonut("gastos")}
                className="py-2"
              />
            </div>
            {/* GRÁFICO */}
            <div className="min-h-[370px] flex items-center overflow-hidden">
              {loadindDonut ? (
                <Loading
                  isTrue={loadindDonut}
                  className="absolute top-0 left-0 w-full h-full row-span-1 loading-not"
                />
              ) : (
                <GraphicsPie
                  data={categoriasByMonth?.length
                    ? categoriasByMonth
                    : [{ label: "", value: 3141592653589793, color: "#808080" }]
                  }
                />
              )}
            </div>
          </div>
          {/* INFORMAÇÕES DO GRÁFICO */}
          <div className="flex flex-col xl:max-w-[350px] max-w-full xl:mx-0 sm:max-w-[650px] w-full">
            <h4 className="flex flex-col items-center gap-1 py-4 font-semibold leading-4">
              Maior {typeGraphicDonut.slice(0, -1)} do mês:
              <p className="flex items-center gap-2 px-4 py-2 font-medium rounded-md bg-brand-dark-gray">
                  <span
                    style={{ backgroundColor: Array.from(categoriasByMonth || []).sort((a, b) => b.value - a.value)[0]?.color }}
                    className="w-4 h-4 rounded-sm"
                  />
                <span>{Array.from(categoriasByMonth || []).sort((a, b) => b.value - a.value)[0]?.label}</span>
                <span>{`- ${calcPorcentagem(
                    Array.from(categoriasByMonth || []).sort((a, b) => b.value - a.value)[0]?.value,
                    categoriasByMonth?.sort((a, b) => a.value - b.value).map((c) => c.value) || []
                  )}%`}
                </span>
                <span className="text-brand-gray">{`(${currencyFormatPT(Array.from(categoriasByMonth || []).sort((a, b) => b.value - a.value)[0]?.value)})`}</span>
              </p>
            </h4>
            <div className="flex flex-col flex-wrap lg:flex-row gap-x-3 gap-y-[.05rem]">
              {categoriasByMonth?.map((categInfo, index) => (
                <div className="flex items-center justify-center gap-2 w-max" key={index}>
                  <span
                    style={{ backgroundColor: categInfo.color }}
                    className="w-4 h-4 rounded-sm"
                  />
                  {categInfo.label}
                  {" - "}
                  <span className="">
                    {calcPorcentagem(categInfo.value, categoriasByMonth.sort((a, b) => a.value - b.value).map((c) => c.value))}{"% "}
                    <span className="text-brand-gray">{"("+currencyFormatPT(categInfo.value)+")"}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* GRÁFICO DE BARRAS DO ANO */}
        <div className="flex flex-wrap-reverse items-center justify-center w-full h-full gap-x-6">
          {/* INFORMAÇÕES DO GRÁFICO */}
          <div className="flex flex-col xl:max-w-[350px] m-auto lg:items-center max-w-full xl:mx-0 sm:max-w-[650px] w-full">
            <div className="flex flex-col items-start w-full py-4 leading-5 text-[18px]">
              <h4 className="flex gap-2 font-semibold">
                Maior ganho do Ano:
                <span className="font-medium text-brand-red">
                  {currencyFormatPT([...gastosByYear].sort((a, b) => b - a)[0])}
                </span>
              </h4>
              <h4 className="flex gap-2 font-semibold">
                Maior gasto do Ano:
                <span className="font-medium text-brand-green">
                  {currencyFormatPT([...ganhosByYear].sort((a, b) => b - a)[0])}
                </span>
              </h4>
            </div>
            <div className="flex flex-wrap items-center justify-start w-full h-full max-h-full gap-y-2">
              {Array(12).fill(0).map((_, index) => (
                <div className="flex items-center basis-1/3" key={index}>
                  <div className="w-[90%] flex flex-col items-center justify-center py-2 rounded-md bg-brand-dark-gray">
                    <span className="font-bold text-brand-white-gray">{months.find((month) => Number(month.value) == index + 1)?.label}</span>
                    <div className="flex flex-col leading-none">
                      <span className="font-semibold text-brand-red">{currencyFormatPT(gastosByYear[index])}</span>
                      <span className="font-semibold text-brand-green">{currencyFormatPT(ganhosByYear[index])}</span>
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
                  options={[
                    { label: "2024", value: "2024" },
                    { label: "2023", value: "2023" },
                    { label: "2022", value: "2022" },
                  ]}
                  transparent={false}
                  className="min-w-[120px]"
                  clearable={false}
                />
              </div>
              <h4 className="font-normal text-[20px]">Estatisticas Anuais</h4>
              <div className="flex gap-4">
                <div className="flex gap-2">
                  <span className="w-6 h-6 rounded-md bg-brand-red" />
                  <span className="font-semibold text-brand-white-gray">Gastos</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-6 h-6 rounded-md bg-brand-green" />
                  <span className="font-semibold text-brand-white-gray">Ganhos</span>
                </div>
              </div>
            </div>
            {/* GRÁFICO */}
            <div className="min-h-[370px] h-[370px] flex items-center overflow-hidden">
              {loadindBar ? (
                <Loading
                  isTrue={loadindBar}
                  className="absolute top-0 left-0 w-full h-full row-span-1 loading-not"
                />
              ) : (
                <GraphicsBar
                  colTypes={months.map((month) => month.label.slice(0, 3))}
                  gastos={gastosByYear}
                  ganhos={ganhosByYear}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
