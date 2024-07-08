const canchaSelected2 = {
  id: 1,
  nombre: "Samanes",
  descripcion: "Cancha Principal",
  costo_por_hora: 60,
  disponible: false,
  horarios: [
    {
      id: 10,
      hora_inicio: "2024-06-30T10:00:00Z",
      hora_fin: "2024-06-30T12:00:00Z",
      cancha: 1,
      reserved: true,
    },
    {
      id: 11,
      hora_inicio: "2024-06-30T17:00:00Z",
      hora_fin: "2024-06-30T18:00:00Z",
      cancha: 1,
      reserved: true,
    },
  ],
};

function Horarios() {
  const { canchaSelected } = useCancha();
  const [selectedItem, setSelectedItem] = useState(null);

  const onSelectedItem = (idx) => {
    setSelectedItem(idx);
  };
  return (
    <div className="horarios p-5">
      {canchaSelected.horarios &&
        canchaSelected.horarios.map((horario, index) => (
          <>
            <HorarioItem
              key={horario.id}
              index={index}
              selectedItem={selectedItem}
              onItemClick={onSelectedItem}
              isDisponible={canchaSelected.disponible}
            />
          </>
        ))}
    </div>
  );
}

function HorarioItem({ index, selectedItem, onItemClick, isDisponible }) {
  const { canchaSelected } = useCancha();

  const handleItemClick = (idx) => {
    onItemClick(idx);
  };
  return (
    <>
      <div className=" flex  items-center  justify-around  w-max h-max gap-1">
        <div
          className={`p-3 my-2 border border-gray-400 rounded-md transition-colors w-40  ${
            canchaSelected.horarios[index].reserved === true
              ? "bg-red-500 cursor-not-allowed"
              : "cursor-pointer"
          } ${
            selectedItem === index
              ? "border-green-600 bg-green-50"
              : "border-transparent"
          }`}
          onClick={() => handleItemClick(index)}
        >
          <h2 className="text-lg text-center font-serif font-semibold text-gray-800">
            {`${formatTime(
              canchaSelected.horarios[index].hora_inicio
            )} - ${formatTime(canchaSelected.horarios[index].hora_fin)}`}
          </h2>
        </div>
      </div>
    </>
  );
}
