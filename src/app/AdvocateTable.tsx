import {Advocate} from "@/app/types/model";
import React from "react";

function formatPhoneNumber(phoneNumberString: string): string | undefined {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        const intlCode = (match[1] ? '+1 ' : '');
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
}

const AdvocateCard = ({advocate}: { advocate: Advocate }) => {
    return (
        <div className="border-b py-6 md:flex md:gap-6">
            {/*Could be replaced with an image provided by the advocate object from backend*/}
            <img
                src={"https://media.istockphoto.com/id/1587604256/photo/portrait-lawyer-and-black-woman-with-tablet-smile-and-happy-in-office-workplace-african.webp?s=2048x2048&w=is&k=20&c=Bb8faonUUWuL0KlV0VQh0-yQLzWECQVzg5zs9KcPt_Y="}
                alt={`${advocate.firstName} ${advocate.lastName}`}
                className="w-28 h-28 object-cover rounded-md mb-4 md:mb-0"
            />

            <div className="flex-1">
                <div className="flex justify-between items-start flex-wrap gap-2">
                    <h2 className="text-xl font-bold ">
                        {advocate.firstName} {advocate.lastName}
                        {advocate.degree && `, ${advocate.degree}`}
                    </h2>
                </div>

                <p className="text-gray-800 mt-1">
                    {advocate.specialties.join(", ")}
                </p>

                <div className="mt-4 flex flex-col sm:flex-row gap-6 text-sm">
                    <div>
                        <div className="font-semibold">Patient Rating</div>
                        <div className="text-gray-600">No reviews</div>
                        <div className="mt-1 font-semibold">
                            Employed by Solace Health
                        </div>
                        <div className="mt-2 font-semibold">
                            <a
                                href={`tel:${advocate.phoneNumber}`}
                                className="text-teal-600 font-semibold hover:underline"
                            >
                                {formatPhoneNumber(advocate.phoneNumber)}
                            </a>
                        </div>
                    </div>

                    <div>
                        <div className="font-semibold">Location</div>
                        <div>{advocate.city}</div>
                        <div className="mt-1 text-gray-700">
                            {advocate.yearsOfExperience} years experience
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdvocateTable = ({advocates}: { advocates: Advocate[] }) => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Available Advocates
            </h2>
            <div className="space-y-8">
                {advocates.map((advocate: Advocate, index) => (
                    <AdvocateCard key={advocate.id} advocate={advocate}/>
                ))}
            </div>
        </div>)
};

export default AdvocateTable;
