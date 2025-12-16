import React, { useState, useEffect } from "react";
import { Modal } from "../ui/model";
import { Button } from "../ui/button";
import { FaTrash, FaUpload, FaEye, FaCheck } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";

type FileItem = {
  _id: string; 
  file: string; 
  type: string;
  createdAt: string;
};

interface FileInputExampleProps {
  onFileSelect: (fileUrl: string | null) => void; 
  selectedFile: string | null; 
  title: string; 
  setName: string; 
  Componenttitle: string; 
  h1: string; 
  SetButtonName: string; 
}

const FileInputExample: React.FC<FileInputExampleProps> = ({ 
  onFileSelect, 
  selectedFile, 
  title, 
  setName, 
  Componenttitle, 
  h1, 
  SetButtonName 
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showUploadSection, setShowUploadSection] = useState<boolean>(true);
  const [showAllFilesSection, setShowAllFilesSection] = useState<boolean>(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(selectedFile);
  const [allFiles, setAllFiles] = useState<FileItem[]>([]);
  const [hoveredFile, setHoveredFile] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch all files from the server
  const fetchAllFiles = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}files/get`);
      
      if (response.data?.files) {
        // Filter to only include image files (modify as needed)
        const files = response.data.files
          .filter((item: any) => item.type === 'image')
          .map((item: any) => ({
            _id: item._id,
            file: item.file,
            type: item.type,
            createdAt: item.createdAt
          }));
        
        // Sort by creation date (newest first)
        setAllFiles(files.sort((a: FileItem, b: FileItem) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
      } else {
        setAllFiles([]);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
      toast.error("Failed to load files");
      setAllFiles([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAllFiles();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedFileUrl(selectedFile);
  }, [selectedFile]);

  // Handle file upload
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);

        const response = await axios.post(`${BACKEND_URL}files/add`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data?.file?.file) {
          uploadedUrls.push(response.data.file.file);
        }
      }

      // Refresh files list
      await fetchAllFiles();

      // Select the last uploaded file
      if (uploadedUrls.length > 0) {
        const lastUploadedUrl = uploadedUrls[uploadedUrls.length - 1];
        setSelectedFileUrl(lastUploadedUrl);
        
        // Find the file in allFiles to get its ID
        const uploadedFile = allFiles.find(file => file.file === lastUploadedUrl);
        if (uploadedFile) {
          onFileSelect(uploadedFile._id);
        }
      }

      toast.success(`${files.length} file(s) uploaded successfully`);
      
      // Switch to All Files section
      setShowUploadSection(false);
      setShowAllFilesSection(true);
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Failed to upload files");
    } finally {
      setUploading(false);
    }
  };

  // Handle delete file
  const handleDeleteFile = async (fileId: string, fileUrl: string) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      const response = await axios.delete(`${BACKEND_URL}files/delete/${fileId}`);

      if (response.status === 200) {
        // Remove from local state
        setAllFiles(prev => prev.filter(file => file._id !== fileId));

        // If deleted file was the selected one, clear selection
        if (selectedFile === fileId) {
          setSelectedFileUrl(null);
          onFileSelect(null);
        }

        toast.success("File deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete file");
    }
  };

  // Handle set featured file
  const handleSetFeaturedFile = () => {
    if (selectedFileUrl) {
      // Find the file in allFiles to get its ID
      const selectedFileData = allFiles.find(file => file.file === selectedFileUrl);
      if (selectedFileData) {
        onFileSelect(selectedFileData._id);
        toast.success("File selected successfully");
        closeModal();
      }
    }
  };

  // Handle remove file
  const handleRemoveFile = () => {
    setSelectedFileUrl(null);
    onFileSelect(null);
    toast.success("File removed");
  };

  // Open modal
  const openModal = () => {
    setIsOpen(true);
    setShowUploadSection(true);
    setShowAllFilesSection(false);
    fetchAllFiles();
  };

  // Close modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Handle file click in gallery
  const handleFileClick = (fileUrl: string) => {
    setSelectedFileUrl(selectedFileUrl === fileUrl ? null : fileUrl);
  };

  // Handle drag and drop
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    
    if (files.length > 0) {
      const inputEvent = {
        target: { files }
      } as React.ChangeEvent<HTMLInputElement>;
      await handleUpload(inputEvent);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
  
      <div className="space-y-4">
        {/* Preview section */}
        <div className="flex flex-col items-start space-y-4">
          {selectedFileUrl ? (
            <div className="flex flex-col items-start space-y-3">
              <div className="relative group">
                <img
                  src={`${BACKEND_URL}${selectedFileUrl}`}
                  alt="Featured"
                  className="w-48 h-48 object-cover rounded-lg border-2 border-blue-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <FaEye className="text-white text-2xl" />
                </div>
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openModal}
                >
                  Change Image
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleRemoveFile}
                >
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
              <p className="text-gray-500 mb-3">No image selected</p>
              <Button
                onClick={openModal}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {setName}
              </Button>
            </div>
          )}
        </div>

        {/* Modal for Uploading and Selecting Files */}
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-6xl"
          title={h1}
        >
          <div className="space-y-6">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setShowUploadSection(true);
                    setShowAllFilesSection(false);
                  }}
                  className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${showUploadSection
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                  Upload Files
                </button>
                <button
                  onClick={() => {
                    setShowUploadSection(false);
                    setShowAllFilesSection(true);
                  }}
                  className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${showAllFilesSection
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                  Media Library
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="min-h-[400px]">
              {/* Upload Section */}
              {showUploadSection && (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors cursor-pointer"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleUpload}
                    className="hidden"
                  />
                  <div className="space-y-4">
                    <FaUpload className="text-4xl text-gray-400 mx-auto" />
                    <div>
                      <p className="text-lg font-semibold text-gray-700">
                        {uploading ? "Uploading..." : "Click to upload or drag & drop"}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <Button
                      disabled={uploading}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {uploading ? "Uploading..." : "Select Files"}
                    </Button>
                  </div>
                </div>
              )}

              {/* All Files Section */}
              {showAllFilesSection && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-[400px] overflow-y-auto p-2">
                    {allFiles.map((file) => (
                      <div
                        key={file._id}
                        className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${selectedFileUrl === file.file
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-transparent"
                          }`}
                        onClick={() => handleFileClick(file.file)}
                        onMouseEnter={() => setHoveredFile(file._id)}
                        onMouseLeave={() => setHoveredFile(null)}
                      >
                        <img
                          src={`${BACKEND_URL}${file.file}`}
                          alt={`File ${file._id}`}
                          className="w-full h-32 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                          }}
                        />
                        
                        {/* Selection indicator */}
                        {selectedFileUrl === file.file && (
                          <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                            <FaCheck size={12} />
                          </div>
                        )}

                        {/* Hover overlay */}
                        {hoveredFile === file._id && (
                          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteFile(file._id, file.file);
                              }}
                              className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                              title="Delete"
                            >
                              <FaTrash size={14} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedFileUrl(file.file);
                              }}
                              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                              title="Select"
                            >
                              <FaCheck size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {allFiles.length === 0 && (
                      <div className="col-span-full text-center py-12">
                        <p className="text-gray-500">No files found. Upload some files first.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer actions */}
            <div className="flex justify-between items-center border-t border-gray-200 pt-4">
              <div className="text-sm text-gray-600">
                {selectedFileUrl && (
                  <span className="flex items-center space-x-2">
                    <FaCheck className="text-green-600" />
                    <span>1 file selected</span>
                  </span>
                )}
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSetFeaturedFile}
                  disabled={!selectedFileUrl}
                  className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {SetButtonName}
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    
  );
};

export default FileInputExample;