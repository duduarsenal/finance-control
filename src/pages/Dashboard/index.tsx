import { getCampos, getCategorias, saveCampos, saveCategorias } from "@api"
import { Detetive, Vigia } from '@assets'
import {
  Button,
  DashboardTable,
  Graphics,
  ModalCategoria,
  Select
} from "@components"
import { Cores, Months } from '@enums'
import {
  CamposProps,
  CategoriaProps,
  CategoriasGraficoProps,
  GenericProps,
  OutletContextProps,
} from "@typings"
import {
  Icons,
  cn,
  currencyFormatPT,
  months,
} from "@utils"
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"

export function DashboardPage() {
  const [monthSelected, setMonthSelected] = useState<GenericProps | null>(
    {label: Months[new Date().getMonth() + 1], value: new Date().getMonth() + 1}
  )
  
  const [modalCategoria, setModalCategoria] = useState<boolean>(false)

  const [categorias, setCategorias] = useState<CategoriaProps[]>([])
  const [campos, setCampos] = useState<CamposProps[]>([])

  const [totalGastos, setTotalGastos] = useState<number>(0)
  const [totalGanhos, setTotalGanhos] = useState<number>(0)

  const [saldoTotal, setSaldoTotal] = useState<number>(0)

  const [year, setYear] = useState<GenericProps | null>(null)
  const [month, setMonth] = useState<GenericProps | null>(null)

  const [loadindBar, setLoadindBar] = useState<boolean>(false)
  const [loadindDonut, setLoadindDonut] = useState<boolean>(false)

  const [ganhosByYear, setGanhosByYear] = useState<number[]>([])
  const [gastosByYear, setGastosByYear] = useState<number[]>([])

  const [typeGraphicDonut, setTypeGraphicDonut] = useState<string>("ganhos")

  const [categoriasByMonth, setCategoriasByMonth] = useState<CategoriasGraficoProps[] | null>(null)

  const { addNotification, setIsPageHeader, setIsLoading } = useOutletContext<OutletContextProps>()

  async function saveCategoria(values: CategoriaProps[]) {
    // SALVE LISTA DE CATEGORIAS NO LOCALSTORAGE
    await saveCategorias(values)
    // SALVA NOVA LISTA DE CATEGORIAS NO STATE
    setCategorias(await getCategorias())

    setModalCategoria(false)
    addNotification("sucess", "Categorias atualizas com sucesso.")
  }
  
  async function salvarCampos(campos: CamposProps[]){
    await saveCampos([...await getCampos(), ...campos])

    handleStates()
  }

  async function saveCampo(campo: CamposProps) {
    const camposExistentes = await getCampos()
    camposExistentes.push(campo)
    
    // SALVA LISTA DE CAMPOS NO LOCALSTORAGE
    await saveCampos(camposExistentes)
    
    // SALVA NOVA LISTA DE CAMPOS NO STATE
    handleStates()

    addNotification("sucess", `${campo.type === "gastos" ? "Gasto" : "Ganho"} adicionado com sucesso.`)
  }

  async function editCampo(campo: CamposProps) {
    const camposExistentes = await getCampos()
    // CRIA UMA NOVA LISTA DE CAMPOS COM O CAMPO EDITADO
    const novosCampos = camposExistentes.map((c) => {
      if (c.id === campo.id && c.parcelas.atual == campo.parcelas.atual) {
        c = { ...campo }
      }
      return c
    })

    // SALVA NOVA LISTA NO LOCALSTORAGE/BACKEND
    await saveCampos(novosCampos)
    // SALVA NOVA LISTA DE CAMPOS NO STATE
    handleStates()

    addNotification("sucess", `${campo.type === "gastos" ? "Gasto" : "Ganho"} editado com sucesso.`)
  }

  async function removeCampo(campo: CamposProps, idTipo: number) {
    const camposExistentes = await getCampos()
    
    //CRIA UMA NOVA LISTA DE CAMPOS REMOVENDO O CAMPO EXCLUIDO
    let novosCampos
    if(idTipo === 1){
      novosCampos = camposExistentes.filter((c) => c.id !== campo.id)
    } else {
      novosCampos = camposExistentes.filter((c) => c.originalId !== campo.originalId)
    }

    // SALVA NOVA LISTA DE CAMPOS NO LOCALSTORAGE/BACKEND
    await saveCampos(novosCampos)
    // SALVA NOVA LISTA DE CAMPOS NO STATE
    handleStates()

    addNotification("sucess", `${campo.type === "gastos" ? "Gasto" : "Ganho"} removido com sucesso.`)
  }

  async function handleStates() {
    const camposComParcelas = await getCampos()
    // SALVA LISTA DE CATEGORIAS NO STATE BUSCANDO DO LOCALSTORAGE/BACK
    setCategorias(await getCategorias())
    // SALVA LISTA DE CAMPOS NO STATE BUSCANDO DO LOCALSTORAGE/BACK (APLICANDO FILTRO DE MÊS CASO ESTEJA SELECIONADO)
    setCampos(
      (monthSelected
        ? camposComParcelas.filter((campo) => campo.month == monthSelected?.value)
        : camposComParcelas
      ).sort((a, b) => new Date(a.dtadd).getTime() - new Date(b.dtadd).getTime())
    )

    setIsLoading(false)
  }

  // Busca os dados no LOCALSTORAGE AO CARREGAR A PAGE
  useEffect(() => {
    handleStates()
    setIsPageHeader(window.location.pathname)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ATUALIZA OS STATES CASO ALGUM MÊS SEJA SELECIONADO NO FILTRO DE MÊS
  useEffect(() => {
    handleStates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthSelected])

  // SALVA SALDO TOTAL CASO SEJA ATUALIZADO ALGUM GASTO/GANHO
  useEffect(() => {
    setSaldoTotal(totalGanhos - totalGastos)
  }, [totalGanhos, totalGastos])

  // MONITORA QUALQUER ATUALIZAÇÃO DE DADOS PARA ATUALIZAR O GRÁFICO
  useEffect(() => {
    // PROCESSA OS CAMPOS PARA EXIBIR NO GRAFICO ANUAL DE BARRAS
    async function processarCamposByAno(tipo: string, setState: (values: number[]) => void) {
      setLoadindBar(true)
      const result: number[] = Array(12).fill(0)

      let camposFiltrados: CamposProps[] = await getCampos()

      if (year) {
        camposFiltrados = camposFiltrados
        .filter((campo) => campo.data.split("-")[0] === year.value.toString())
      } else {
        camposFiltrados = camposFiltrados
          .filter((campo) => campo.data.split("-")[0] === new Date().getFullYear().toString())
      }

      camposFiltrados.forEach((campo) => {
        if (campo.type === tipo) {
          if (!isNaN(campo.valor.parcela)) {
            result[campo.month - 1] += campo.valor.parcela // Ajusta o índice do mês (0 a 11) ~ (Jan a Dez)
          }
        }
      })

      setState(result)
      setLoadindBar(false)
    }

    processarCamposByAno("ganhos", setGanhosByYear)
    processarCamposByAno("gastos", setGastosByYear)
  }, [campos, categorias, totalGastos, totalGanhos, saldoTotal, year])

  // MONITORA QUALQUER ATUALIZAÇÃO DE DADOS PARA ATUALIZAR O GRÁFICO
  useEffect(() => {
    // PROCESSA OS CAMPOS PARA EXIBIR NO GRÁFICO MENSAL DE DONUT
    function processarCamposByMonth(campos: CamposProps[], tipo: string, setState: (values: CategoriasGraficoProps[]) => void) {
      setLoadindDonut(true)

      const mesFiltro = monthSelected ? monthSelected.value : month ? month.value : Number(new Date().toISOString().split("-")[1])
      const camposByTipo = campos.filter((campo) => {
        if (campo.type === tipo && campo.month.toString() === mesFiltro.toString()) return campo
      })

      const camposFiltrados = camposByTipo.reduce((acc: CategoriasGraficoProps[], ct: CamposProps) => {
        const existingCampo = acc.find((campo) => campo.label === ct.categoria.label)

        if (existingCampo) {
          existingCampo.value += ct.valor.parcela
        } else {
          acc.push({
            label: ct.categoria.label,
            value: ct.valor.parcela,
            color: Cores[ct?.categoria?.cor?.value?.toString().toUpperCase()  as keyof typeof Cores]
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
    <main className="px-2 h-max">
      <div className="flex justify-between w-full py-8 h-max">
        <div className="flex items-center gap-6">
          <div className="w-56">
            <Select
              optionDefault="Selecione um mês"
              options={months}
              value={monthSelected as CategoriaProps}
              setValue={setMonthSelected}
              icon={<Icons.FaCalendarCheck className="text-brand-text" />}
              transparent={false}
              className="outline-brand-border"
              clearable={false}
            />
          </div>
          <h4 className="text-brand-text text-[18px]">
            Saldo:{" "}
            <span
              className={cn("text-brand-text", {
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
      <div className="relative px-2 h-max">
        <div className="flex items-center justify-center absolute -top-6 left-1/3">
          <img src={Vigia} className="w-36 z-20" />
        </div>
        <DashboardTable
          type="gastos"
          campos={campos?.filter((campo) => campo.type === "gastos") || []}
          saveCampo={saveCampo}
          salvarCampos={salvarCampos}
          handleEditCampo={editCampo}
          removeCampo={removeCampo}
          categorias={categorias}
          setTotal={setTotalGastos}
        />
      </div>

      <div className="relative px-2 h-max">
        <div className="flex items-center justify-center absolute top-2/4 -translate-y-2/4 -right-[66px] z-50">
          <img src={Detetive} className="w-20 z-50" />
        </div>

        {/* DASHBOARD/TABLE DE GANHOS */}
        <DashboardTable
          type="ganhos"
          campos={campos?.filter((campo) => campo.type === "ganhos") || []}
          saveCampo={saveCampo}
          salvarCampos={salvarCampos}
          handleEditCampo={editCampo}
          removeCampo={removeCampo}
          categorias={categorias}
          setTotal={setTotalGanhos}
        />
      </div>

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
  )
}
