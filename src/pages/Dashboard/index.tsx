import { getCampos, getCategorias, saveCampos, saveCategorias } from "@api";
import {
  Button,
  DashboardTable,
  Graphics,
  ModalCategoria,
  Select
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

  const [categorias, setCategorias] = useState<CategoriaProps[]>([]);
  const [campos, setCampos] = useState<CamposProps[]>([]);

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

  const { addNotification, setIsPageHeader, setIsLoading, tipoDados } = useOutletContext<OutletContextProps>();

  // Altera entre os tipos de dados mockados
  useEffect(() => {
    handleTipoDados(tipoDados)
  }, [tipoDados])

  async function handleTipoDados(tipoDados?: string){
    if(tipoDados == "prod"){
      setIsLoading(true)

      setCategorias(await getCategorias())
      setCampos(await getCampos());

      setIsLoading(false)
    }

    if(tipoDados == "mock"){
      setIsLoading(true)

      setCategorias(categoriasJSON)
      setCampos(camposJSON)
      
      setIsLoading(false)
    }
  }

  async function saveCategoria(values: CategoriaProps[]) {

    if(tipoDados == "mock"){
      // SALVA OS DADOS MOCKADOS
      setCategorias(values)
    } else {
      // SALVE LISTA DE CATEGORIAS NO LOCALSTORAGE
      await saveCategorias(values);
      // SALVA NOVA LISTA DE CATEGORIAS NO STATE
      setCategorias(await getCategorias());
    }

    setModalCategoria(false);
    addNotification("sucess", "Categorias atualizas com sucesso.");
  }

  async function saveCampo(campo: CamposProps) {
    if(tipoDados == "mock"){
      setCampos([...campos, campo])
    } else {
      // SALVA LISTA DE CAMPOS NO LOCALSTORAGE
      await saveCampos([...(await getCampos()), campo]);
      // SALVA NOVA LISTA DE CAMPOS NO STATE
      setCampos(await getCampos());
    }

    addNotification("sucess", `${campo.type === "gastos" ? "Gasto" : "Ganho"} adicionado com sucesso.`);
  }

  async function editCampo(campo: CamposProps) {
    if(tipoDados == "mock"){
      setCampos(campos.map((c) => { 
        if(c.id === campo.id) c = {...campo}
        return c
      }))
    } else {
      // CRIA UMA NOVA LISTA DE CAMPOS COM O CAMPO EDITADO
      const novosCampos = (await getCampos()).map((c) => {
        if (c.id === campo.id) c = { ...campo };
        return c;
      });
  
      // SALVA NOVA LISTA NO LOCALSTORAGE/BACKEND
      await saveCampos(novosCampos);
      // SALVA NOVA LISTA DE CAMPOS NO STATE
      setCampos(await getCampos());
    }

    addNotification("sucess", `${campo.type === "gastos" ? "Gasto" : "Ganho"} editado com sucesso.`);
  }

  async function removeCampo(campo: CamposProps) {
    if(tipoDados == "mock"){
      setCampos(campos.filter((c) => c.id !== campo.id))
    } else {
      //CRIA UMA NOVA LISTA DE CAMPOS REMOVENDO O CAMPO EXCLUIDO
      const novosCampos = (await getCampos()).filter((c) => c.id !== campo.id);
      
      // SALVA NOVA LISTA DE CAMPOS NO LOCALSTORAGE/BACKEND
      await saveCampos(novosCampos);
      // SALVA NOVA LISTA DE CAMPOS NO STATE
      setCampos(await getCampos());
    }

    addNotification("sucess", `${campo.type === "gastos" ? "Gasto" : "Ganho"} removido com sucesso.`);
  }

  async function handleStates() {
    if(tipoDados == "mock"){
      setCategorias(categoriasJSON)
      setCampos(
        (monthSelected
          ? camposJSON.filter((campo) => campo.month == monthSelected?.value)
          : camposJSON
        ).sort((a, b) => new Date(a.dtadd).getTime() - new Date(b.dtadd).getTime())
      );
    } else {
      // SALVA LISTA DE CATEGORIAS NO STATE BUSCANDO DO LOCALSTORAGE/BACK
      setCategorias(await getCategorias());
      // SALVA LISTA DE CAMPOS NO STATE BUSCANDO DO LOCALSTORAGE/BACK (APLICANDO FILTRO DE MÊS CASO ESTEJA SELECIONADO)
      setCampos(
        (monthSelected
          ? (await getCampos()).filter((campo) => campo.month == monthSelected?.value)
          : await getCampos()
          ).sort((a, b) => new Date(a.dtadd).getTime() - new Date(b.dtadd).getTime())
      );
    }

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
      <Graphics 
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
        months={months}
        monthSelected={monthSelected}
        loadingBar={loadindBar}
        loadingDonut={loadindDonut}
        ganhosByYear={ganhosByYear}
        gastosByYear={gastosByYear}
        categoriasByMonth={categoriasByMonth}
        typeGraphicDonut={typeGraphicDonut}
        setTypeGraphicDonut={setTypeGraphicDonut}
      />
    </main>
  );
}
