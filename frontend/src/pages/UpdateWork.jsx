import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const WorkDetailPage = () => {
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const res = await api.get(`/My-library/${id}`);
        setWork(res.data);
      } catch (error) {
        console.log("Error in fetching work", error);
        toast.error("Failed to fetch the work");
      } finally {
        setLoading(false);
      }
    };

    fetchWork();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this work?")) return;

    try {
      await api.delete(`/My-library/${id}`);
      toast.success("Work deleted");
      navigate("/mylist");
    } catch (error) {
      console.log("Error deleting the work:", error);
      toast.error("Failed to delete work");
    }
  };

  const handleSave = async () => {
    if (!work.title.trim() || !work.comment.trim()) {
      toast.error("Please add a title or comment");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/My-library/${id}`, work);
      toast.success("Work updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the work:", error);
      toast.error("Failed to update work");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/MyList" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Works
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Work
            </button>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body p-6 space-y-4">
              {/* Title Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter work title"
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={work.title}
                  onChange={(e) => setWork({ ...work, title: e.target.value })}
                />
              </div>

              {/* Comment Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base">Comment</span>
                </label>
                <textarea
                  placeholder="Write your work details here..."
                  className="textarea textarea-bordered w-full h-40 focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={work.comment}
                  onChange={(e) => setWork({ ...work, comment: e.target.value })}
                />
              </div>

              {/* Action Buttons */}
              <div className="card-actions justify-end mt-6">
                <button 
                  className="btn btn-primary w-full sm:w-auto px-8"
                  disabled={saving} 
                  onClick={handleSave}
                >
                  {saving ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Saving...
                    </>
                  ) : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WorkDetailPage;