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
  GenericProps,
  OutletContextProps,
} from "@typings";
import { Icons, cn, currencyFormatPT, months } from "@utils";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

export function Dashboard() {
  const [monthSelected, setMonthSelected] = useState<GenericProps | null>(null);
  const [modalCategoria, setModalCategoria] = useState<boolean>(false);

  const [categorias, setCategorias] = useState<CategoriaProps[]>([]);
  const [campos, setCampos] = useState<CamposProps[]>([]);

  const [totalGastos, setTotalGastos] = useState<number>(0);
  const [totalGanhos, setTotalGanhos] = useState<number>(0);

  const [saldoTotal, setSaldoTotal] = useState<number>(0);

  const [year, setYear] = useState<GenericProps | null>(null);
  const [month, setMonth] = useState<GenericProps | null>(null);

  const [loadindBar, setLoadindBar] = useState<boolean>(false);
  const [loadindDonut, setLoadindDonut] = useState<boolean>(false);

  const [ganhosByYear, setGanhosByYear] = useState<any[]>([])
  const [gastosByYear, setGastosByYear] = useState<any[]>([])
  
  const [categoriasByMonth, setCategoriasByMonth] = useState<any>()

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

    addNotification(
      "sucess",
      `${campo.type === "gastos" ? "Gasto" : "Ganho"} adicionado com sucesso.`
    );
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

    addNotification(
      "sucess",
      `${campo.type === "gastos" ? "Gasto" : "Ganho"} editado com sucesso.`
    );
  }

  async function removeCampo(campo: CamposProps) {
    //CRIA UMA NOVA LISTA DE CAMPOS REMOVENDO O CAMPO EXCLUIDO
    const novosCampos = (await getCampos()).filter((c) => c.id !== campo.id);

    // SALVA NOVA LISTA DE CAMPOS NO LOCALSTORAGE/BACKEND
    await saveCampos(novosCampos);
    // SALVA NOVA LISTA DE CAMPOS NO STATE
    setCampos(await getCampos());

    addNotification(
      "sucess",
      `${campo.type === "gastos" ? "Gasto" : "Ganho"} removido com sucesso.`
    );
  }

  async function handleStates() {
    // SALVA LISTA DE CATEGORIAS NO STATE BUSCANDO DO LOCALSTORAGE/BACK
    setCategorias(await getCategorias());
    // SALVA LISTA DE CAMPOS NO STATE BUSCANDO DO LOCALSTORAGE/BACK (APLICANDO FILTRO DE MÊS CASO ESTEJA SELECIONADO)
    setCampos(
      (monthSelected
        ? (await getCampos()).filter(
            (campo) => campo.month == monthSelected?.value
          )
        : await getCampos()
      ).sort(
        (a, b) => new Date(a.dtadd).getTime() - new Date(b.dtadd).getTime()
      )
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

  function processarCamposByAno(campos: CamposProps[], tipo: string, setState: (values: any[]) => void){
    const result = Array(12).fill(0);
    
    let camposFiltrados: CamposProps[] = campos;

    if(year){
      camposFiltrados = camposFiltrados.filter((campo) => campo.data.split("-")[0] === year.value.toString())
    } else {
      camposFiltrados = camposFiltrados.filter((campo) => campo.data.split("-")[0] === new Date().getFullYear().toString())
    }

    camposFiltrados.forEach((campo) => {
      if (campo.type === tipo) {
        let value = currencyFormatPT(campo.valor)
          .split(" ")[1]
          .replace(/[\.\,]/g, "");
        value = value.slice(0, -2) + "." + value.slice(-2);
        const numValue = Number(value);

        if (!isNaN(numValue)) {
          result[campo.month - 1] += numValue; // Ajusta o índice do mês (0 a 11) ~ (Jan a Dez)
        }
      }
    });

    setState(result);
  };

  useEffect(() => {
    processarCamposByAno(campos, "ganhos", setGanhosByYear)
    processarCamposByAno(campos, "gastos", setGastosByYear)
  }, [campos, categorias, totalGastos, totalGanhos, saldoTotal])

  function processarCamposByMonth(campos: CamposProps[], tipo: string, setState: (values: any[]) => void){
    
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

      {/* GRÁFICOS */}
      <div className="grid grid-cols-2 py-6 gap-6 overflow-x-hidden">
        <h4 className="text-[24px] font-semibold bg-brand-dark-gray px-4 py-1 rounded-md col-span-2 w-max m-auto">
          Gráficos
        </h4>

        {/* GRAFICO DE PIZZA MENSAL */}
        <div className="grid grid-cols-5 w-full h-full col-span-2 items-center justify-center gap-4">
          {/* GRÁFICO */}
          <div className="flex flex-col gap-6 bg-brand-dark-gray p-4 rounded-md w-full h-full col-span-3 items-center relative">
            <div className="flex items-center justify-between w-full">
              <div className="w-max">
                <Select
                  value={(month ? month : months.find((_, index) => index === new Date().getMonth())) as CategoriaProps}
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
                  option1={{label: "Ganhos", className: "text-brand-green font-bold"}}
                  option2={{label: "Gastos", className: "text-brand-red font-bold"}}
                  action1={() => console.log('act1')}
                  action2={() => console.log('act2')}
                  className="py-2"
              />
            </div>
            <div className="min-h-[400px] flex items-center overflow-hidden">
              {loadindDonut ? (
                <Loading
                  isTrue={loadindDonut}
                  className="absolute top-0 left-0 w-full h-full row-span-1 loading-not"
                />
              ) : (
                <GraphicsPie
                  data={[
                    { label: "Nubank", value: 250, color: "purple" },
                    { label: "Santander", value: 900, color: "red" },
                    { label: "Inter", value: 700, color: "orange" },
                    { label: "Nubank", value: 1200, color: "violet" },
                  ]}
                />
              )}
            </div>
          </div>
          {/* INFORMAÇÕES DO GRÁFICO */}
          <div className="flex items-center justify-center w-full h-full col-span-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia impedit consequuntur distinctio praesentium animi sapiente nesciunt earum in. Nostrum temporibus ratione tempora provident? Doloribus pariatur sequi, dolorum voluptatibus adipisci blanditiis?
          </div>
        </div>

        {/* GRÁFICO DE BARRAS DO ANO */}
        <div className="grid grid-cols-5 w-full h-full col-span-2 items-center justify-center gap-4">
          {/* INFORMAÇÕES DO GRÁFICO */}
          <div className="flex items-center justify-center w-full h-full col-span-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eius, iure dignissimos quam deserunt repellat quis. Qui aliquid facere accusamus dolor in architecto saepe porro magni pariatur, ipsum aspernatur accusantium.
          </div>
          <div className="flex flex-col gap-6 bg-brand-dark-gray p-4 rounded-md w-full h-full col-span-3 items-center overflow-x-auto relative">
            <div className="flex justify-between w-full">
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
            <div className="h-[410px] flex items-center overflow-hidden">
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
