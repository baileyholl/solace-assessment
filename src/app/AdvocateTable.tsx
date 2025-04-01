import React from "react";

function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        var intlCode = (match[1] ? '+1 ' : '');
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
}

const AdvocateTable = ({ advocates }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-sm">
                <thead className="table-header bg-gray-100">
                <tr>
                    <th>Name</th>
                    <th>City</th>
                    <th>Specialties</th>
                    <th>Experience</th>
                    <th>Phone</th>
                </tr>
                </thead>
                <tbody>
                {advocates.map((advocate, index) => (
                    <tr key={index} className="table-row border-b hover:bg-gray-50">
                        <td>{`${advocate.firstName} ${advocate.lastName}${advocate.degree ? `, ${advocate.degree}` : ''}`}</td>
                        <td>{advocate.city}</td>
                        <td>
                            <ul className="list-disc list-inside space-y-1">
                                {advocate.specialties.map((s, i) => (
                                    <li key={i}>{s}</li>
                                ))}
                            </ul>
                        </td>
                        <td>{advocate.yearsOfExperience} yrs</td>
                        <td>{formatPhoneNumber(advocate.phoneNumber)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdvocateTable;
