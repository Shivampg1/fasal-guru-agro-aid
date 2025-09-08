import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Upload, Image, FileImage } from "lucide-react";
import { useState } from "react";

interface UploadSectionProps {
  title: string;
  description: string;
  type: "soil" | "crop";
  onUpload: (file: File) => void;
}

const UploadSection = ({ title, description, type, onUpload }: UploadSectionProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const bgGradient = type === "soil" 
    ? "bg-gradient-to-br from-soil/10 to-harvest/10" 
    : "bg-gradient-to-br from-crop/10 to-primary/10";

  return (
    <Card className={`${bgGradient} border-2 border-dashed ${dragActive ? 'border-primary' : 'border-border'} transition-colors`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileImage className={`w-5 h-5 ${type === "soil" ? "text-soil" : "text-crop"}`} />
          <span>{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {uploadedFile ? (
            <div className="space-y-4">
              <img 
                src={uploadedFile} 
                alt="Uploaded image" 
                className="max-h-32 mx-auto rounded-lg object-cover"
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setUploadedFile(null)}
              >
                Upload Another
              </Button>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <div className="space-y-2">
                <p className="text-sm font-medium">Drop your image here, or</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="hidden"
                  id={`upload-${type}`}
                />
                <label htmlFor={`upload-${type}`}>
                  <Button variant="secondary" className="cursor-pointer" asChild>
                    <span>Browse Files</span>
                  </Button>
                </label>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Supports JPG, PNG, GIF up to 10MB
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadSection;