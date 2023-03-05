import Modal from "../Modal/Modals";
import CartCtxTF from "../Store/auth-context";
import { useContext, useState, useEffect } from "react";
import { update, ref } from "firebase/database";
import { db } from "../../Hooks/firebase";
const UpdateCard = (props) => {
    const [nameV, setNameV] = useState('')
    const [titleV, setTitleV] = useState('')
    const Ctx = useContext(CartCtxTF)
    const name = Ctx.UpdateValue.value
    const title = Ctx.UpdateValue.title
    useEffect(() => {
        if (Ctx.isUpdateIlies) {
            setNameV(name);
            setTitleV(title)
        }
    }, [Ctx.isUpdateIlies]);
    const nameOnchangeHandler = (e) => {
        setNameV(e.target.value)
    }
    const titleOnChangeHandler = (e) => {
        setTitleV(e.target.value)
    }
    const CUuid = Ctx.UpdateValue.ColumnId
    const uuid = Ctx.UpdateValue.uuid
    const AddNameAndTitle = () => {
        update(ref(db, `/${CUuid}/Names/${uuid}`), {
            name:nameV,
            title:titleV,
            uuid
        })  
        Ctx.onCloseIlises()
    }
    return (
        <Modal >
            <label>Update Name</label>
            <input onChange={nameOnchangeHandler} value={nameV} type="text" />
            <label>Description</label>
            <input onChange={titleOnChangeHandler} value={titleV} type="text" />
            <button onClick={AddNameAndTitle}>+ Update Card</button>
        </Modal>
    );
};

export default UpdateCard;