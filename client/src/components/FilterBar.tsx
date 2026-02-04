const FilterBar = ({
  ageGroup,
  category,
  onAgeGroupChange,
  onCategoryChange
}: {
  ageGroup: string;
  category: string;
  onAgeGroupChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-mist bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <select
        value={ageGroup}
        onChange={(event) => onAgeGroupChange(event.target.value)}
        className="rounded-lg border border-mist bg-stone px-3 py-2 text-sm"
      >
        <option value="">All ages</option>
        <option value="20s">20s</option>
        <option value="30s">30s</option>
        <option value="40s">40s</option>
        <option value="50+">50+</option>
      </select>
      <select
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="rounded-lg border border-mist bg-stone px-3 py-2 text-sm"
      >
        <option value="">All categories</option>
        <option value="Career">Career</option>
        <option value="Love">Love</option>
        <option value="Marriage">Marriage</option>
        <option value="Money">Money</option>
        <option value="Health">Health</option>
        <option value="Regret">Regret</option>
        <option value="General">General</option>
      </select>
    </div>
  );
};

export default FilterBar;
