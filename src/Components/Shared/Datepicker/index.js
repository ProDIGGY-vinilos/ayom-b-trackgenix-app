function DatePicker(state) {
  state = {
    fecha: new Date()
  };

  const onChange = (fecha) => {
    this.setState({ fecha: fecha });
  };

  return (
    <div className="Contenedor">
      <div className="Center"></div>
      <DatePicker selecter={state.fecha} onChange={onChange}></DatePicker>
    </div>
  );
}

export default DatePicker;
