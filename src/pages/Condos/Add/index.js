import { useState } from "react";
import { useLoading } from "../../../context/LoadingContext";

import api from "../../../utils/api";

import "./AddCondo.css";

import ModuleTitleClip from "../../../components/ModuleTitleClip";
import Select from "../../../components/Select";
import Input from "../../../components/Input";

export default function AddCondo() {
  const [users, setUsers] = useState([]);
  const { hideLoading, showLoading } = useLoading();

  const fetchUsers = () => {
    try {
      showLoading();
      const response = api.get("/usuarios?per_page=1000");
      const data = response.data;
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      hideLoading();
    }
  };

  return (
    <section className="easy-container-add-condos">
      <ModuleTitleClip title={"Cadastrar Novo Condomínio"} />
      <Input
        label="Insira o nome do condomínio"
        value={""}
        required={true}
        placeholder="Insira o nome do condomínio"
      />
      <Input
        label="Insira o endereço do condomínio"
        value={""}
        required={true}
        placeholder="Insira o endereço do condomínio"
      />
      <Input
        label="Insira o email do condomínio"
        type="email"
        value={""}
        placeholder="Insira o email do condomínio"
      />
      <Input
        label="Insira o telefone do condomínio"
        value={""}
        type="number"
        placeholder="Insira o telefone do condomínio"
      />
      <Select label="Selecione o síndico responsável pelo condomínio"></Select>
    </section>
  );
}
