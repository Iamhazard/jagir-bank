/* eslint-disable react/no-unescaped-entities */
import React from 'react';

const Contract = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">Contract Agreement</h1>

                <div className="mb-4">
                    <p className="text-gray-700">
                        This Contract is made between <strong>Client Name</strong> (hereinafter referred to as "Client")
                        and <strong>Freelancer Name</strong> (hereinafter referred to as "Freelancer") on
                        <strong> [Contract Date]</strong>.
                    </p>
                </div>

                <h2 className="text-xl font-semibold mt-6 mb-2">Scope of Work</h2>
                <p className="text-gray-700 mb-4">
                    The Freelancer agrees to provide the following services to the Client:
                    <br />
                    <strong>Description of work/services</strong>.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Payment Terms</h2>
                <p className="text-gray-700 mb-4">
                    The Client agrees to pay the Freelancer <strong>[Amount]</strong> for the work specified above.
                    The payment will be made as follows:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4">
                    <li>Initial payment: [Amount] on [Date]</li>
                    <li>Final payment: [Amount] upon completion of work</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-2">Deadlines</h2>
                <p className="text-gray-700 mb-4">
                    The Freelancer agrees to complete the work by <strong>[Due Date]</strong>.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Termination</h2>
                <p className="text-gray-700 mb-4">
                    Either party may terminate this contract by providing written notice.
                </p>

                <div className="mt-8 flex justify-between items-center">
                    <div>
                        <p className="text-gray-700"><strong>Client Signature</strong></p>
                        <p className="text-gray-700 mt-2">______________________________</p>
                    </div>
                    <div>
                        <p className="text-gray-700"><strong>Freelancer Signature</strong></p>
                        <p className="text-gray-700 mt-2">______________________________</p>
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <p className="text-gray-500 text-sm">
                        By signing this contract, both parties agree to the terms and conditions outlined above.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contract;
