import React, { useEffect, useRef, useState } from 'react';

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
    label?: string;
    required?: boolean;
    onImageUpload?: (file: File) => Promise<string>; // Optional: custom image upload handler
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
    value,
    onChange,
    placeholder = 'Start typing your content here...',
    label,
    required = false,
    onImageUpload
}) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editorInstance, setEditorInstance] = useState<any>(null);

    // Load CKEditor from jsDelivr CDN
    const loadCKEditor = () => {
        return new Promise<void>((resolve, reject) => {
            // Check if already loaded
            if ((window as any).ClassicEditor) {
                resolve();
                return;
            }

            // console.log('Loading CKEditor from jsDelivr...');
            
            // Using jsDelivr CDN
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@ckeditor/ckeditor5-build-classic@35.4.0/build/ckeditor.js';
            script.async = true;
            script.crossOrigin = 'anonymous';

            // Load styles
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdn.jsdelivr.net/npm/@ckeditor/ckeditor5-build-classic@35.4.0/build/ckeditor.css';
            document.head.appendChild(link);

            script.onload = () => {
                // console.log('CKEditor loaded successfully');
                resolve();
            };

            script.onerror = () => {
                reject(new Error('Failed to load CKEditor. The CDN might be blocked.'));
            };

            document.head.appendChild(script);
        });
    };

    // Custom image upload adapter
    class MyUploadAdapter {
        private loader: any;
        private xhr?: XMLHttpRequest;

        constructor(loader: any) {
            this.loader = loader;
        }

        upload() {
            return this.loader.file.then((file: File) => {
                return new Promise((resolve, reject) => {
                    if (onImageUpload) {
                        // Use custom upload handler if provided
                        onImageUpload(file)
                            .then((url) => {
                                resolve({
                                    default: url
                                });
                            })
                            .catch(reject);
                    } else {
                        // Default: Convert to base64 data URL
                        const reader = new FileReader();
                        reader.onload = () => {
                            resolve({
                                default: reader.result as string
                            });
                        };
                        reader.onerror = () => {
                            reject(reader.error);
                        };
                        reader.readAsDataURL(file);
                    }
                });
            });
        }

        abort() {
            if (this.xhr) {
                this.xhr.abort();
            }
        }
    }

    function MyCustomUploadAdapterPlugin(editor: any) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
            return new MyUploadAdapter(loader);
        };
    }

    // Initialize editor
    const initializeEditor = async () => {
        if (!editorRef.current) {
            console.log('Editor container not ready yet');
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            // Load CKEditor
            await loadCKEditor();

            // Check if CKEditor is available
            const ClassicEditor = (window as any).ClassicEditor;
            if (!ClassicEditor) {
                throw new Error('CKEditor not available after loading.');
            }

            // Destroy existing editor
            if (editorInstance) {
                try {
                    await editorInstance.destroy();
                } catch (err) {
                    console.warn('Error destroying previous editor:', err);
                }
            }

            // Create editor with custom upload adapter
            const editor = await ClassicEditor.create(editorRef.current, {
                placeholder: placeholder,
                toolbar: {
                    items: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                        'numberedList',
                        '|',
                        'imageUpload',
                        'blockQuote',
                        '|',
                        'undo',
                        'redo'
                    ],
                    shouldNotGroupWhenFull: true
                },
                heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
                    ]
                },
                image: {
                    toolbar: [
                        'imageTextAlternative',
                        'toggleImageCaption',
                        'imageStyle:inline',
                        'imageStyle:block',
                        'imageStyle:side'
                    ],
                    styles: {
                        options: [
                            'inline',
                            'block',
                            'side'
                        ]
                    }
                },
                link: {
                    addTargetToExternalLinks: true,
                    defaultProtocol: 'https://'
                },
                extraPlugins: [MyCustomUploadAdapterPlugin],
                initialData: value || ''
            });

            // Set initial content
            if (value) {
                editor.setData(value);
            }

            // Listen for changes
            editor.model.document.on('change:data', () => {
                onChange(editor.getData());
            });

            setEditorInstance(editor);
            setIsLoading(false);

        } catch (err: any) {
            console.error('Failed to initialize CKEditor:', err);
            setError(err.message || 'Failed to load editor. Using textarea instead.');
            setIsLoading(false);
        }
    };

    // Initialize on mount
    useEffect(() => {
        let isMounted = true;

        const init = () => {
            if (isMounted) {
                initializeEditor();
            }
        };

        // Start after a short delay
        const timer = setTimeout(init, 300);

        return () => {
            isMounted = false;
            clearTimeout(timer);
            
            // Cleanup
            if (editorInstance) {
                try {
                    editorInstance.destroy();
                } catch (err) {
                    console.warn('Error destroying editor:', err);
                }
            }
        };
    }, []);

    // Sync value changes
    useEffect(() => {
        if (editorInstance && value !== editorInstance.getData()) {
            editorInstance.setData(value || '');
        }
    }, [value, editorInstance]);

    const handleRetry = () => {
        setError(null);
        setIsLoading(true);
        setTimeout(() => initializeEditor(), 300);
    };

    // If error, show textarea fallback
    if (error) {
        return (
            <div className="space-y-3 ">
             
                
                <div className="p-4 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                    <div className="text-yellow-700 dark:text-yellow-300 mb-3">
                        <p className="font-medium">Note:</p>
                        <p className="text-sm mt-1">{error}</p>
                        <p className="text-xs mt-2">Using basic textarea instead.</p>
                    </div>
                    
                    <button
                        onClick={handleRetry}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium mb-3"
                    >
                        Try Loading Editor Again
                    </button>
                    
                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        className="w-full min-h-[400px] p-3 border border-gray-300 rounded text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-3 ">
            
            
            <div 
                ref={editorRef}
                className="min-h-[300px] border border-gray-300 dark:border-gray-700 rounded-lg relative bg-white dark:bg-gray-900"
            >
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 bg-opacity-90">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 dark:border-blue-500 border-t-transparent mx-auto mb-3"></div>
                            <p className="text-gray-700 dark:text-gray-300">Loading editor...</p>
                        </div>
                    </div>
                )}
            </div>
            
            {!isLoading && (
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 ">
                    <span>Supports: Text formatting, images, links, lists</span>
                    <span className="text-green-600 dark:text-green-400">✓ Ready</span>
                </div>
            )}
        </div>
    );
};

export default RichTextEditor;