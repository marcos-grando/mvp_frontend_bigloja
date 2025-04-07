import { useEffect, useState } from "react";
import { listarComprasAdm } from "../../api_compras";
import AdminProducts from "./AdminProducts";
import AdminPurchases from "./AdminPurchases";

function Admin() {
    const [divOpt, setDivOpt] = useState("produtos");
    const [compras, setCompras] = useState([]);

    const optClick = (opt, event) => {
        setDivOpt(opt);

        document.querySelectorAll(".opts-admin p").forEach(p => p.classList.remove("selected"));
        event.target.classList.add("selected");
    };

    useEffect(() => {
        const carregarDados = async () => {
            const comprasData = await listarComprasAdm();

            if (comprasData) setCompras(comprasData);
        };

        carregarDados();
    }, []);
    
    return (
        <>
            <section className="admin">
                <h2>Painel Administrativo</h2>
                <div className="wrapper-admin">
                    <div className="opts-admin">
                        <p className="selected" onClick={(event) => optClick("produtos", event)}>Nossos Produtos</p>
                        <p onClick={(event) => optClick("compras", event)}>Compras Registradas</p>
                    </div>
                    {divOpt === "produtos" && <AdminProducts />}
                    {divOpt === "compras" && <AdminPurchases compras={compras} setCompras={setCompras} />}
                </div>
            </section>
        </>
    );
}

export default Admin;
