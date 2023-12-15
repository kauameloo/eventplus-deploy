import React, { useContext } from "react";
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
import { UserContext } from "../../../context/AuthContext";

// import trashDelete from "../../../assets/images/trash-delete.svg";

const Table = ({ dados, fnDelete = null, fnUpdate = null }) => {
  const { userData } = useContext(UserContext);
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
            Comentário
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
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
