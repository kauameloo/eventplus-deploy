import React from "react";
import "./TableDe.css";
// import editPen from "../../../assets/images/edit-pen.svg";
import editPen from "../../../assets/images/edit-pen.svg";
import trashDelete from "../../../assets/images/trash-delete.svg";
import { dateFormateDbToView } from "../../../Utils/stringFunctions";
import { FaEye } from "react-icons/fa";

// importa a biblioteca de tootips ()
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";

// import trashDelete from "../../../assets/images/trash-delete.svg";

const Table = ({ dados, fnDelete = null, fnUpdate = null }) => {
  const navigate = useNavigate();
  // console.log(dados);
  return (
    <table className="table-data">
      <thead className="table-data__head">
        <tr className="table-data__head-row">
          <th className="table-data__head-title table-data__head-title--big">
            Nome
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Descrição
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Editar
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Deletar
          </th>
        </tr>
      </thead>
      <tbody>
        {dados.map((tp) => {
          return (
            <tr className="table-data__head-row" key={tp.idComentarioEvento}>
              <td className="table-data__data table-data__data--big">
                {tp.usuario.nome}
              </td>
              <td
                className="table-data__data table-data__data--big table-data__data--handover"
                data-tooltip-id="description-tooltip"
                data-tooltip-content={tp.descricao}
                data-tooltip-place="top"
              >
                {tp.descricao.substr(0, 15)} ...
                <Tooltip
                  id="description-tooltip"
                  className="custom-tootip"
                />
              </td>

              {/* <td className="table-data__data table-data__data--little">
                <FaEye
                  className="table-data__icon"
                  idevento={tp.idEvento}
                  src=""
                  alt=""
                  onClick={(e) =>
                    // dá pra passar o obhjeto tp direto?

                    navigate(`/detalhes-evento/${tp.idEvento}`)

                  }
                />
              </td> */}

              <td className="table-data__data table-data__data--little">
                <img
                  className="table-data__icon"
                  idevento={tp.idEvento}
                  src={editPen}
                  alt=""
                  onClick={(e) =>
                    // dá pra passar o obhjeto tp direto?
                    fnUpdate({//showUpdateForma(??)
                      idEvento: tp.idEvento,
                      nomeEvento: tp.nomeEvento,
                      dataEvento: tp.dataEvento,
                      descricao: tp.descricao,
                      idInstituicao: tp.idInstituicao, //por enquanto chumbado
                      idTipoEvento: tp.idTipoEvento
                    })
                  }
                />
              </td>

              <td className="table-data__data table-data__data--little">
                <img
                  className="table-data__icon"
                  idevento={tp.idEvento}
                  src={trashDelete}
                  alt=""
                  onClick={(e) => fnDelete(e.target.getAttribute("idevento"))}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
