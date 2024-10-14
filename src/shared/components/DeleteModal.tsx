import { IoClose } from "react-icons/io5"
import dangerIcon from "@assets/icons/danger.png"

interface DeleteModalProps {
    toggleModal: (id?: string) => void
    deleteId: string
    deleteAction: (id: string) => void
}

const DeleteModal: React.FC<DeleteModalProps> = ({ toggleModal, deleteId, deleteAction }) => {
    return (
        <article className="fixed inset-0 flex justify-center items-center z-40 bg-black bg-opacity-70" onClick={() => toggleModal()} >
            <section className="bg-white rounded-lg p-12 relative max-w-[40%]" onClick={e => e.stopPropagation()}>
                <IoClose
                    size={28}
                    className="absolute top-7 right-7 cursor-pointer"
                    onClick={() => toggleModal()}
                />

                <img src={dangerIcon} alt="Danger" className="mx-auto max-h-[150px]" />

                <p className="text-center text-3xl font-semibold my-7">
                    ¿Estás seguro?
                </p>

                <p className="text-center text-lg mb-10">
                    Este proceso no se puede deshacer.
                </p>

                <div className="flex gap-7 justify-center text-white font-medium text-lg">
                    <button
                        className="bg-gray-400 rounded-md px-7 py-1 text-base"
                    onClick={() => toggleModal()}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-red-400 rounded-md px-7 py-1 text-base"
                        onClick={() => deleteAction(deleteId)}
                    >
                        Eliminar
                    </button>
                </div>
            </section>
        </article>
    )
}

export default DeleteModal