import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
    const navigate = useNavigate();

    // If job is not available, don't render anything
    if (!job) {
        return null;
    }

    const daysAgoFunction = (mongodbTime) => {
        if (!mongodbTime) return "Today";

        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;

        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    };

    const daysAgo = daysAgoFunction(job.createdAt);

    return (
        <div className="p-5 bg-white border border-gray-100 rounded-md shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    {daysAgo === 0 ? "Today" : `${daysAgo} days ago`}
                </p>

                <Button variant="outline" size="icon" className="rounded-full">
                    <Bookmark className="w-5 h-5" />
                </Button>
            </div>

            {/* Company Details */}
            <div className="flex items-center gap-3 my-4">
                <Button variant="outline" size="icon" className="p-6">
                    <Avatar>
                        <AvatarImage
                            src={job.company?.logo || ""}
                            alt={job.company?.name || "Company Logo"}
                        />
                    </Avatar>
                </Button>

                <div>
                    <h1 className="text-lg font-semibold">
                        {job.company?.name || "Company Name"}
                    </h1>
                    <p className="text-sm text-gray-500">
                        {job.location || "India"}
                    </p>
                </div>
            </div>

            {/* Job Details */}
            <div>
                <h1 className="my-2 text-lg font-bold">
                    {job.title || "Job Title"}
                </h1>

                <p className="text-sm text-gray-600">
                    {job.description || "No description available."}
                </p>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 mt-4">
                <Badge variant="ghost" className="font-bold text-blue-700">
                    {job.position || 0} Positions
                </Badge>

                <Badge variant="ghost" className="font-bold text-red-600">
                    {job.jobType || "N/A"}
                </Badge>

                <Badge variant="ghost" className="font-bold text-purple-700">
                    {job.salary || 0} LPA
                </Badge>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 mt-5">
                <Button
                    variant="outline"
                    onClick={() => navigate(`/description/${job._id}`)}
                >
                    Details
                </Button>

                <Button className="bg-[#7209b7] hover:bg-[#5f0aa0]">
                    Save For Later
                </Button>
            </div>
        </div>
    );
};

export default Job;