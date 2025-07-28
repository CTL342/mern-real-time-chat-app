const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
    return (
        <div className='flex justify-center gap-6 mt-4'>
            <div className='form-control'>
                <label className={`label gap-2 cursor-pointer p-2 rounded-lg border ${selectedGender === "male" ? "bg-primary-content bg-opacity-80 border-primary-content" : "border-primary-content"}`}> <span className='label-text text-base text-primary'>Male</span>
                    <input
                        type='checkbox'
                        className='checkbox checkbox-primary-content border-gray-500'
                        checked={selectedGender === "male"}
                        onChange={() => onCheckboxChange("male")}
                    />
                </label>
            </div>
            <div className='form-control'>
                <label className={`label gap-2 cursor-pointer p-2 rounded-lg border ${selectedGender === "female" ? "bg-primary-content bg-opacity-80 border-primary-content" : "border-primary-content"}`}> <span className='label-text text-base text-primary'>Female</span>
                    <input
                        type='checkbox'
                        className='checkbox checkbox-primary-content border-gray-500'
                        checked={selectedGender === "female"}
                        onChange={() => onCheckboxChange("female")}
                    />
                </label>
            </div>
        </div>
    );
};
export default GenderCheckbox;
