import { useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import WorkCard from "../components/WorkCard";
import WorksNotFound from "../components/WorksNotFound";

const MyList = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await api.get("/My-Library");
        console.log(res.data);
        setWorks(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching works");
        console.log(error.response);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load works");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading works...</div>}

        {works.length === 0 && !isRateLimited && <WorksNotFound />}

        {works.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {works.map((work) => (
              <WorkCard key={work._id} work={work} setWorks={setWorks} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyList;