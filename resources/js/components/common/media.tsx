import React, { useState, useEffect } from "react";
import { Modal } from "../ui/model";
import { Button } from "../ui/button";
import { FaTrash, FaUpload, FaEye, FaCheck, FaSpinner, FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { ImageIcon } from "lucide-react";

type FileItem = {
  id: string;
  file: string;
  thumbnailUrl?: string;
  type: string;
  name: string;
  fileName: string;
  size: string;
  formattedSize?: string;
  dimensions?: string;
  dimensionsString?: string;
  createdAt: string;
  mimeType?: string;
  isImage?: boolean;
};

interface MediaProps {
  onFileSelect: (fileId: string | null) => void; 
  selectedFile: string | null; 
  title: string; 
  setName: string; 
  Componenttitle: string; 
  h1: string; 
  SetButtonName: string;
  mediaList?: FileItem[];
}

const Media: React.FC<MediaProps> = ({ 
  onFileSelect, 
  selectedFile, 
  title, 
  setName, 
  Componenttitle, 
  h1, 
  SetButtonName,
  mediaList = []
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showUploadSection, setShowUploadSection] = useState<boolean>(true);
  const [showAllFilesSection, setShowAllFilesSection] = useState<boolean>(false);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(selectedFile);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [allFiles, setAllFiles] = useState<FileItem[]>(mediaList);
  const [hoveredFile, setHoveredFile] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [uploadedFilesCount, setUploadedFilesCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch media files using fetch API
  const fetchMedia = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/media', {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch media');
      }
      
      const data = await response.json();
      
      if (data.success && data.data.media) {
        const files = data.data.media.data.map((item: any) => ({
          id: item.id,
          file: item.url,
          thumbnailUrl: item.thumbnailUrl || item.url,
          type: item.type,
          name: item.name,
          fileName: item.fileName,
          size: item.size,
          formattedSize: item.formattedSize,
          dimensions: item.dimensions,
          dimensionsString: item.dimensionsString,
          createdAt: item.createdAt,
          mimeType: item.mimeType,
          isImage: item.isImage
        }));
        setAllFiles(files);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
      toast.error('Failed to load media files');
    } finally {
      setLoading(false);
    }
  };

  // Single file upload
  const handleUpload = async (file: File) => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('is_public', '1');
    
    setUploading(true);
    setUploadProgress(0);
    
    try {
      // Get CSRF token from meta tag
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      
      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': csrfToken || '',
        },
        credentials: 'include'
      });
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Upload failed');
        }
        
        if (data.success) {
          const newFileData = data.data;
          const newFile: FileItem = {
            id: newFileData.id,
            file: newFileData.url,
            thumbnailUrl: newFileData.thumbnailUrl,
            type: newFileData.type,
            name: newFileData.name,
            fileName: newFileData.fileName,
            size: newFileData.size,
            formattedSize: newFileData.formattedSize,
            dimensionsString: newFileData.dimensionsString,
            createdAt: newFileData.createdAt,
            isImage: newFileData.isImage
          };
          
          setAllFiles(prev => [newFile, ...prev]);
          setSelectedFileId(newFile.id);
          setSelectedFileUrl(newFile.file);
          
          toast.success("File uploaded successfully!");
          setShowUploadSection(false);
          setShowAllFilesSection(true);
        }
      } else {
        // If not JSON, it might be a CSRF error page
        const text = await response.text();
        throw new Error('CSRF token validation failed or server error');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload file');
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setFilesToUpload([]);
    }
  };

  // Multiple files upload
  const handleMultipleUpload = async (files: File[]) => {
    if (files.length === 0) return;
    
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files[]', file);
    });
    formData.append('is_public', '1');
    
    setUploading(true);
    setUploadProgress(0);
    setUploadedFilesCount(0);
    
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      
      const response = await fetch('/api/media/multiple', {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': csrfToken || '',
        },
        credentials: 'include'
      });
      
      // Simulate progress for better UX
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        
        clearInterval(interval);
        setUploadProgress(100);
        
        if (!response.ok) {
          throw new Error(data.message || 'Upload failed');
        }
        
        if (data.success && data.data && data.data.files) {
          const newFiles: FileItem[] = data.data.files.map((item: any) => ({
            id: item.id,
            file: item.url,
            thumbnailUrl: item.thumbnailUrl || item.url,
            type: item.type,
            name: item.name,
            fileName: item.fileName,
            size: item.size,
            formattedSize: item.formattedSize,
            dimensions: item.dimensions,
            dimensionsString: item.dimensionsString,
            createdAt: item.createdAt,
            isImage: item.isImage
          }));
          
          // Add new files to the beginning of the list
          setAllFiles(prev => [...newFiles, ...prev]);
          setUploadedFilesCount(newFiles.length);
          
          // Select the first uploaded file if none selected
          if (newFiles.length > 0 && !selectedFileId) {
            setSelectedFileId(newFiles[0].id);
            setSelectedFileUrl(newFiles[0].file);
          }
          
          // Show success message
          if (newFiles.length > 0) {
            toast.success(`${newFiles.length} files uploaded successfully!`);
          }
          
          // Show failed uploads if any
          if (data.data.failed && data.data.failed.length > 0) {
            toast.error(`${data.data.failed.length} files failed to upload`);
          }
          
          // Auto-switch to media library after upload
          setTimeout(() => {
            setShowUploadSection(false);
            setShowAllFilesSection(true);
          }, 1000);
        }
      } else {
        clearInterval(interval);
        const text = await response.text();
        throw new Error('CSRF token validation failed or server error');
      }
    } catch (error: any) {
      console.error('Multiple upload error:', error);
      toast.error(error.message || 'Failed to upload files');
    } finally {
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
        setFilesToUpload([]);
      }, 1000);
    }
  };

  // Handle file input change for both single and multiple files
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setFilesToUpload(fileArray);
      
      if (fileArray.length === 1) {
        // Single file upload
        handleUpload(fileArray[0]);
      } else {
        // Multiple files upload
        handleMultipleUpload(fileArray);
      }
      
      // Reset file input
      e.target.value = '';
    }
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setFilesToUpload(fileArray);
      
      if (fileArray.length === 1) {
        handleUpload(fileArray[0]);
      } else {
        handleMultipleUpload(fileArray);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Cancel upload
  const handleCancelUpload = () => {
    setUploading(false);
    setFilesToUpload([]);
    setUploadProgress(0);
    // toast.info("Upload cancelled");
  };

  // Remove file from upload queue
  const removeFileFromQueue = (index: number) => {
    const newFiles = [...filesToUpload];
    newFiles.splice(index, 1);
    setFilesToUpload(newFiles);
    
    if (newFiles.length === 0) {
      setUploading(false);
    }
  };

  // Delete file
  const handleDeleteFile = async (fileId: string) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      
      const response = await fetch(`/api/media/${fileId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': csrfToken || '',
        },
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Delete failed');
      }
      
      if (data.success) {
        setAllFiles(prev => prev.filter(file => file.id !== fileId));
        if (selectedFileId === fileId) {
          setSelectedFileId(null);
          setSelectedFileUrl(null);
        }
        toast.success("File deleted successfully");
      }
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error(error.message || 'Failed to delete file');
    }
  };

  // Handle set featured file
  const handleSetFeaturedFile = () => {
    if (selectedFileId) {
      onFileSelect(selectedFileId);
      toast.success("File selected successfully");
      closeModal();
    }
  };

  // Handle remove file
  const handleRemoveFile = () => {
    setSelectedFileId(null);
    setSelectedFileUrl(null);
    onFileSelect(null);
  };

  // Open modal
  const openModal = () => {
    setIsOpen(true);
    setShowUploadSection(true);
    setShowAllFilesSection(false);
    
    // Fetch files when modal opens
    fetchMedia();
  };

  // Close modal
  const closeModal = () => {
    setIsOpen(false);
    setFilesToUpload([]);
    setUploading(false);
    setUploadProgress(0);
  };

  // Handle file click in gallery
  const handleFileClick = (fileId: string, fileUrl: string) => {
    setSelectedFileId(selectedFileId === fileId ? null : fileId);
    setSelectedFileUrl(selectedFileId === fileId ? null : fileUrl);
  };

  // Find selected file URL when ID changes
  useEffect(() => {
    if (selectedFileId) {
      const file = allFiles.find(f => f.id === selectedFileId);
      if (file) {
        setSelectedFileUrl(file.file);
      }
    }
  }, [selectedFileId, allFiles]);

  // Initialize with selected file
  useEffect(() => {
    if (selectedFile) {
      setSelectedFileId(selectedFile);
      const file = allFiles.find(f => f.id === selectedFile);
      if (file) {
        setSelectedFileUrl(file.file);
      }
    }
  }, [selectedFile, allFiles]);

  // Use provided media list if available
  useEffect(() => {
    if (mediaList.length > 0) {
      setAllFiles(mediaList);
    }
  }, [mediaList]);

  return (
    <div className="space-y-4">
      {/* Preview section */}
      <div className="">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 mb-4">
              <ImageIcon className="h-5 w-5" />
              {title}
            </CardTitle>
            
            {selectedFileUrl ? (
              <div className="flex flex-col items-start space-y-3">
                <div className="relative group">
                  {/* Display selected image */}
                  <div className="w-48 h-48 bg-gray-100 border-2 border-(--blue) rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                      src={selectedFileUrl} 
                      alt="Selected" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveFile}
                    className="text-red-600 hover:text-red-700 hover:border-red-200"
                  >
                    Remove
                  </Button>
                
              </div>
            ) : (
              <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-(--blue) transition-colors">
                <div className="space-y-3">
                  <FaUpload className="text-3xl text-gray-400 mx-auto" />
                  <p className="text-gray-600">No image selected</p>
                  <Button
                    onClick={openModal}
                    className="bg-(--blue) hover:bg-(--blue) text-white"
                  >
                    {setName}
                  </Button>
                </div>
              </div>
            )}
          </CardHeader>
        </Card>
      </div>

      {/* Modal for Uploading and Selecting Files */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-9xl"
        title={h1}
      >
        <div className="space-y-6 p-5">
          <div className="">
            {/* Tabs */}
            <div className="border-b border-gray-200 p-2">
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setShowUploadSection(true);
                    setShowAllFilesSection(false);
                  }}
                  className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${showUploadSection
                    ? "bg-(--blue) rounded-sm text-white"
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
                    ? "bg-(--blue) rounded-sm text-white"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                  Media Library ({allFiles.length})
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="min-h-[400px]">
              {/* Upload Section */}
              {showUploadSection && (
                <div className="space-y-4">
                  {/* File upload area */}
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-(--blue) transition-colors cursor-pointer w-full"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                      disabled={uploading}
                      multiple
                    />
                    <div className="space-y-4">
                      {uploading ? (
                        <div className="space-y-4">
                          <div className="text-lg font-semibold text-gray-700">
                            {filesToUpload.length > 1 
                              ? `Uploading ${filesToUpload.length} files...`
                              : `Uploading ${filesToUpload[0]?.name}...`}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-(--blue) h-3 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-500">
                            {uploadProgress}% complete
                            {uploadedFilesCount > 0 && ` • ${uploadedFilesCount} files uploaded`}
                          </p>
                          <Button
                            onClick={handleCancelUpload}
                            variant="outline"
                            size="sm"
                            className="mt-2"
                          >
                            Cancel Upload
                          </Button>
                        </div>
                      ) : (
                        <>
                          <FaUpload className="text-4xl text-gray-400 mx-auto" />
                          <div>
                            <p className="text-lg font-semibold text-gray-700">
                              Click to upload or drag & drop
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              PNG, JPG, GIF up to 10MB each
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              Supports multiple file selection
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Files to upload queue */}
                  {filesToUpload.length > 0 && !uploading && (
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-700 mb-2">Selected Files ({filesToUpload.length})</h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {filesToUpload.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center space-x-2">
                              <FaUpload className="text-gray-400" />
                              <span className="text-sm truncate">{file.name}</span>
                              <span className="text-xs text-gray-500">
                                ({(file.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFileFromQueue(index);
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-4">
                        <Button
                          onClick={() => setFilesToUpload([])}
                          variant="outline"
                          size="sm"
                        >
                          Clear All
                        </Button>
                        <Button
                          onClick={() => {
                            if (filesToUpload.length === 1) {
                              handleUpload(filesToUpload[0]);
                            } else {
                              handleMultipleUpload(filesToUpload);
                            }
                          }}
                          className="bg-(--blue) hover:bg-(--blue) text-white"
                          size="sm"
                        >
                          Upload {filesToUpload.length} File{filesToUpload.length > 1 ? 's' : ''}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* All Files Section */}
              {showAllFilesSection && (
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-12">
                      <FaSpinner className="animate-spin text-4xl text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Loading media library...</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 max-h-[400px] overflow-y-auto p-2">
                        {allFiles.map((file) => (
                          <div
                            key={file.id}
                            className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${selectedFileId === file.id
                              ? "border-(--blue) ring-2 ring-blue-200"
                              : "border-gray-200"
                              }`}
                            onClick={() => handleFileClick(file.id, file.file)}
                            onMouseEnter={() => setHoveredFile(file.id)}
                            onMouseLeave={() => setHoveredFile(null)}
                          >
                            {/* File thumbnail */}
                            <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                              {file.thumbnailUrl || file.file ? (
                                <img 
                                  src={file.thumbnailUrl || file.file} 
                                  alt={file.name} 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="text-center">
                                  <FaEye className="text-2xl text-gray-400 mx-auto mb-1" />
                                  <p className="text-xs text-gray-500 truncate px-2">
                                    {file.fileName}
                                  </p>
                                </div>
                              )}
                            </div>
                            
                            {/* Selection indicator */}
                            {selectedFileId === file.id && (
                              <div className="absolute top-2 right-2 bg-(--blue) text-white rounded-full p-1">
                                <FaCheck size={12} />
                              </div>
                            )}

                            {/* Hover overlay */}
                            {hoveredFile === file.id && (
                              <div className="absolute inset-0 bg-black/50 bg-opacity-70 flex items-center justify-center space-x-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteFile(file.id);
                                  }}
                                  className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                                  title="Delete"
                                >
                                  <FaTrash size={14} />
                                </button>
                             
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {allFiles.length === 0 && (
                        <div className="text-center py-12">
                          <FaUpload className="text-4xl text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No files found. Upload some files first.</p>
                          <Button
                            onClick={() => {
                              setShowUploadSection(true);
                              setShowAllFilesSection(false);
                            }}
                            className="mt-4 bg-(--blue) hover:bg-(--blue) text-white"
                          >
                            Upload Files
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Footer actions */}
            <div className="flex justify-between items-center border-t border-gray-200 pt-4">
              <div className="text-sm text-gray-600">
                {selectedFileId ? (
                  <span className="flex items-center space-x-2">
                    <FaCheck className="text-green-600" />
                    <span>1 file selected</span>
                  </span>
                ) : (
                  <span>No file selected</span>
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
                  disabled={!selectedFileId}
                  className="bg-(--blue) hover:bg-(--blue) text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {SetButtonName}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Media;