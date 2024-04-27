import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"
import { DELETE_PROJECT, UPDATE_PROJECT } from "../gql/projects";
import { useMutation } from "@apollo/client";

const ProjectCard = ({ project }) => {
    const router = useRouter();
    const [updateP, setUpdateP] = useState(null)
    const [form, setForm] = useState({ _id: "", name: "", description: "" })

    const [deleteProject, { loading: deleting, error: deleteError }] =
        useMutation(DELETE_PROJECT, {
            refetchQueries: ["getProjects"],
        });

    const [updateProject, { loading: updating, error: updateError }] =
        useMutation(UPDATE_PROJECT, {
            refetchQueries: ["getProjects"],
        });

    const handleDelete = async (id) => {
        const result = await deleteProject({
            variables: {
                id,
            },
        });
        if (result.data.deleteProject._id) {
            console.log("deleted");
        }
    };

    const handleUpdate = async (id) => {
        console.log("index", index);
        const result = await updateProject({
            variables: {
                id,
                name: form.name,
                description: form.description
            },
        });
        if (result.data.updateProject._id) {
            console.log("updated");
        }
    };

    const handleChange = (key, value) => {
        setForm({ ...form, [key]: value })
    }

    const handleSelectUpdate = (index) => {
        setUpdateP(index);
    };

    useEffect(() => {
        setForm({ _id: project._id, name: project.name, description: project.description })
    }, [updateP])


    return (
        <div
            className="gap-3 m-5 p-10
             flex size-fit w-auto bg-zinc-800 border-solid border-1 
             border-blue w-full rounded-lg shadow-lg p-4 mb-2 hover:bg-zinc-700"
        >
            <div className="px-20 py-5 1px border-2 border-red border-solid 
                    flex flex-col items-start justify-start gap-5 w-auto">
                <h2 className="text-lg font-bold text-white">Nombre: {project.name}</h2>
                <p className="text-slate-400 text-sm text-white">Descripción: {project.description}</p>
                <div>
                    <button onClick={() => handleDelete(project._id)} className="bg-red-500 px-5 py-2">
                        {deleting ? "Eliminando..." : "Borrar"}
                    </button>
                </div>
                <div>
                    <button onClick={() => handleSelectUpdate(project._id)} className="bg-red-500 px-5 py-2">
                        Editar
                    </button>
                </div>
            </div>
            {
                updateP && updateP === project._id && (
                    <div className="p-5 1px border-2 border-red border-solid 
                    flex flex-col items-center justify-center gap-5">
                        <h2 className="text-lg font-bold text-white">Editar</h2>
                        <input type="text" className="text-lg font-bold rounded-sm px-5 py-0" value={form.name}
                            onChange={(e) => handleChange("name", e.target.value)} />
                        <input type="text" className="text-lg font-bold rounded-sm px-5 py-0" value={form.description}
                            onChange={(e) => handleChange("description", e.target.value)} />
                        <div className="flex gap-5">
                            <button onClick={() => handleUpdate(form._id)} className="bg-red-500 px-5 py-2 rounded-sm">
                                {updating ? "Actualizando..." : "Actualizar"}
                            </button>
                            <button onClick={() => handleSelectUpdate(null)} className="bg-red-500 px-5 py-2">
                                Cerrar
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ProjectCard;
