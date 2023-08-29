interface propValues {
  children: React.ReactNode;
  show:boolean;
}

const Modal = (props: propValues) => {
  const {  children,show } = props;
  const modalStyle =
    "fixed top-[60px] left-1/2 -translate-x-1/2 w-[510px] py-4 sm:py-8 px-5 z-100 bg-style";
  return (
    <div className={show ? modalStyle : "hidden "}>
      {children}
    </div>
  );
};

export default Modal;
