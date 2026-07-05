import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector((store) => store.job);

    useEffect(() => {
        let isMounted = true;

        const fetchAllJobs = async () => {
            try {
                console.log("Searching:", searchedQuery);

                const res = await axios.get(
                    `${JOB_API_END_POINT}/get?keyword=${searchedQuery || ""}`
                );

                console.log("API Response:", res.data);

                if (isMounted && res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);

                if (isMounted) {
                    dispatch(setAllJobs([]));
                }
            }
        };

        fetchAllJobs();

        return () => {
            isMounted = false;
        };
    }, [searchedQuery, dispatch]);
};

export default useGetAllJobs;