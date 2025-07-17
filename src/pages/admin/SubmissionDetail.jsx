import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../AxioInstance";

const SubmissionDetail = () => {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMark, setNewMark] = useState("");
  const [editingMark, setEditingMark] = useState(false);
  const [updating, setUpdating] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const res = await axiosInstance.get(`adminuser/submission/?submissionId=${id}`);
        setSubmission(res.data);
        setNewMark(res.data.mark ?? "");
      } catch (err) {
        setError("Failed to fetch submission details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [id]);

  const handleMarkUpdate = async () => {
    try {
      setUpdating(true);
      const res = await axiosInstance.patch(
        `adminuser/submission/?submissionId=${id}`,
        { mark: newMark }
      );
      setSubmission(res.data);
      setEditingMark(false);
    } catch (err) {
      alert("Failed to update mark");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-red-50 border-l-4 border-red-400 rounded">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Submission Review</h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>Student: <strong className="text-gray-900">{submission.student}</strong></span>
          <span>•</span>
          <span>Assignment: <strong className="text-gray-900">{submission.assignment}</strong></span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Submission Status */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Submission Status</h2>
            <div className="flex items-center justify-between">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  submission.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : submission.status === "rejected"
                    ? "bg-red-100 text-red-800"
                    : submission.status === "submitted"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Submitted</p>
                <p className="text-sm font-medium">
                  {submission.submitted_at ? new Date(submission.submitted_at).toLocaleDateString() : "Not submitted"}
                </p>
              </div>
            </div>
          </div>

          {/* File Section */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Submitted File</h2>
            {submission.file ? (
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Submission File</p>
                  <p className="text-sm text-gray-500">Click to download and review</p>
                </div>
                <a 
                  href={`${BASE_URL}${submission.file}` }
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
                  target="_blank" 
                  rel="noreferrer"
                >
                  Download
                </a>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <p>No file submitted</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Grading */}
        <div className="space-y-6">
          {/* Completion Status */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold mb-3">Completion</h3>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${submission.is_completed ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className="text-sm font-medium">
                {submission.is_completed ? "Completed" : "In Progress"}
              </span>
            </div>
          </div>

          {/* Grading Section */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Grade</h3>
            
            {editingMark ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mark (0-100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newMark}
                    onChange={(e) => setNewMark(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter mark"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleMarkUpdate}
                    disabled={updating}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
                  >
                    {updating ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => {
                      setEditingMark(false);
                      setNewMark(submission.mark ?? "");
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {submission.mark ?? "—"}
                  {submission.mark && <span className="text-lg text-gray-500">/100</span>}
                </div>
                <button
                  onClick={() => setEditingMark(true)}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm font-medium"
                >
                  Update Mark
                </button>
              </div>
            )}
          </div>

          {/* Quick Info */}
          <div className="bg-gray-50 border rounded-lg p-6">
            <h3 className="font-semibold mb-3 text-gray-800">Quick Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Student:</span>
                <span className="font-medium">{submission.student}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Assignment:</span>
                <span className="font-medium">{submission.assignment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Submitted:</span>
                <span className="font-medium">
                  {submission.submitted_at ? new Date(submission.submitted_at).toLocaleDateString() : "—"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetail;