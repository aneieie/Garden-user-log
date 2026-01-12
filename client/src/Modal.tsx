// import { UserInterface } from './data'

// interface ModalInterface {
//     isOpen: boolean;
//     setIsOpen: (isOpen: boolean) => void
//     user: UserInterface;
//     updateUser: (user: UserInterface, id: string) => void
// }

// export const Modal = (props: ModalInterface) => {
//     const { isOpen, setIsOpen, user, updateUser } = props;
//     if (!isOpen) return null
//     return (
//         (
//             <div className="fixed inset-0 z-50 flex items-center justify-center">
//                 {/* Backdrop */}
//                 <div className="absolute inset-0 bg-black/20" />

//                 {/* Modal content */}
//                 <div className="relative z-10 rounded-lg bg-white h-[550px] w-[500px] shadow-lg">
//                     <button onClick={() => setIsOpen(false)}>Close</button>
//                     <div>
//                         <h1>{user.name}</h1>
//                         <h2>{user.email}</h2>
//                         <h2>{user.role}</h2>
//                     </div>
//                 </div>
//             </div>

//         )
//     )
// }