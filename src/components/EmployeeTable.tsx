import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Employee } from '@/types'; // Make sure to replace with the correct path
import EmployeeProfileForm from '@/forms/employee-profile-form/EmployeeProfileForm';
import { useGetEmployee, useUpdateEmployee } from '@/api/MyRestaurantApi';
import EmployeeSearchBar, { SearchForm } from './EmployeeSearchBar';
import { toast } from 'sonner';

const EmployeeList: React.FC = () => {
  const [employees, setEmployee] = useState<Employee[]>([]);
  const { employees: fetchedEmployees, isLoading: loading } = useGetEmployee();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { updateEmployeeRequest } = useUpdateEmployee();

  useEffect(() => {
    if (!loading && fetchedEmployees) {
      console.log(fetchedEmployees);
      setEmployee(fetchedEmployees);
    }
  }, [loading, fetchedEmployees]);

  const handleItemClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedEmployee(null);
  };

  const handleSubmit = (SearchFormValues: SearchForm) => {
    const foundIndex = employees.findIndex(item => item.name.toLowerCase() == SearchFormValues.searchQuery.toLowerCase());
    if (foundIndex !== -1) {
      setSelectedEmployee(employees[foundIndex]);
      setIsPopupOpen(true);
    } else {
      toast.error('Item not found');
    }
  };

  return (
    <div className="employee-list">
      <EmployeeSearchBar onSubmit={handleSubmit} placeHolder={'Search by name/id'}></EmployeeSearchBar>
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>
      <div className="mb-4">
        <p className="text-lg">Total Employees: {employees.length}</p>
      </div>
      <table className="min-w-full bg-white border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 text-left">Name</th>
            <th className="py-2 px-4 border-b border-gray-200 text-left">Role</th>
            <th className="py-2 px-4 border-b border-gray-200 text-left">Email</th>
            <th className="py-2 px-4 border-b border-gray-200 text-left">Phone</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id} onClick={() => handleItemClick(employee)} className="cursor-pointer hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-gray-200">{employee.name}</td>
              <td className="py-2 px-4 border-b border-gray-200">{employee.role}</td>
              <td className="py-2 px-4 border-b border-gray-200">{employee.email}</td>
              <td className="py-2 px-4 border-b border-gray-200">{employee.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isPopupOpen && selectedEmployee && (
        <Modal
          isOpen={isPopupOpen}
          onRequestClose={handleClosePopup}
          shouldCloseOnOverlayClick={true}
          contentLabel="Edit Employee"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            },
          }}
        >
          <EmployeeProfileForm onSave={updateEmployeeRequest} isLoading={isLoading} employee={selectedEmployee} addedText='Update' />
          <button onClick={handleClosePopup} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded">Close</button>
        </Modal>
      )}
    </div>
  );
};

export default EmployeeList;
