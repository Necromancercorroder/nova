import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, ArrowLeft, ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomDesign() {
  const [currentStep, setCurrentStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [dimensions, setDimensions] = useState({
    scale: 100,
    length: 0,
    width: 0,
    height: 0
  });
  const [rotation, setRotation] = useState({
    x: 0,
    y: 0,
    z: 0
  });
  const [unit, setUnit] = useState("mm");

  const materials = [
    { name: "ABS - Black", color: "bg-black", value: "ABS - Black" },
    { name: "ABS - White", color: "bg-white", value: "ABS - White" },
    { name: "PETG - Red", color: "bg-red-700", value: "PETG - Red" },
    { name: "PLA - Blue", color: "bg-blue-400", value: "PLA - Blue" },
    { name: "PLA - Gray", color: "bg-gray-400", value: "PLA - Gray" },
    { name: "TPU - Black", color: "bg-gray-800", value: "TPU - Black" }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const calculatePrice = () => {
    const basePrice = 15;
    const scaleMultiplier = dimensions.scale / 100;
    const materialMultiplier = selectedMaterial.includes("TPU") ? 1.5 : 1;
    return (basePrice * scaleMultiplier * materialMultiplier).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Custom 3D Design Upload
          </h1>
          
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    currentStep >= step 
                      ? 'bg-gradient-to-r from-orange-400 to-yellow-400 text-gray-900' 
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-0.5 ${
                      currentStep > step ? 'bg-gradient-to-r from-orange-400 to-yellow-400' : 'bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: File Upload */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-orange-400">
                    Upload Your 3D Model
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-orange-400 rounded-lg p-12 text-center hover:border-yellow-400 transition-colors">
                    <input
                      type="file"
                      accept=".stl,.obj"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-orange-400" />
                      <p className="text-lg font-medium text-orange-400">
                        Click to upload or drag and drop your 3D model
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        Supported formats: STL, OBJ
                      </p>
                    </label>
                  </div>

                  {file && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-700 rounded-lg p-4 space-y-2"
                    >
                      <p><strong className="text-orange-400">File:</strong> {file.name}</p>
                      <p><strong className="text-orange-400">Size:</strong> {formatFileSize(file.size)}</p>
                      <p><strong className="text-orange-400">Type:</strong> {file.type || 'Unknown'}</p>
                    </motion.div>
                  )}

                  <Button
                    onClick={() => setCurrentStep(2)}
                    disabled={!file}
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-gray-900 font-semibold"
                  >
                    Continue to Material Selection
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Material Selection */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-orange-400">
                    Select Material & Color
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {materials.map((material) => (
                      <label key={material.value} className="cursor-pointer">
                        <div className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-colors ${
                          selectedMaterial === material.value
                            ? 'border-orange-400 bg-gray-700'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}>
                          <input
                            type="radio"
                            name="material"
                            value={material.value}
                            checked={selectedMaterial === material.value}
                            onChange={(e) => setSelectedMaterial(e.target.value)}
                            className="hidden"
                          />
                          <div className={`w-6 h-6 rounded border-2 border-gray-400 ${material.color}`} />
                          <span className="text-sm font-medium">{material.name}</span>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <Button
                      onClick={() => setCurrentStep(1)}
                      variant="outline"
                      className="border-gray-600 hover:border-gray-500"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={() => setCurrentStep(3)}
                      disabled={!selectedMaterial}
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-gray-900 font-semibold"
                    >
                      Next: Scale & Pricing
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Scale & Pricing */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-orange-400">
                    Scale & Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap gap-4 mb-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="unit"
                        value="mm"
                        checked={unit === "mm"}
                        onChange={(e) => setUnit(e.target.value)}
                        className="text-orange-400"
                      />
                      <span>Millimeters (mm)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="unit"
                        value="inch"
                        checked={unit === "inch"}
                        onChange={(e) => setUnit(e.target.value)}
                        className="text-orange-400"
                      />
                      <span>Inches</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div>
                      <Label htmlFor="scale" className="text-orange-400">Scale (%)</Label>
                      <Input
                        id="scale"
                        type="number"
                        min="1"
                        max="400"
                        value={dimensions.scale}
                        onChange={(e) => setDimensions({...dimensions, scale: parseInt(e.target.value)})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="length" className="text-orange-400">Length</Label>
                      <Input
                        id="length"
                        type="number"
                        min="0"
                        value={dimensions.length}
                        onChange={(e) => setDimensions({...dimensions, length: parseInt(e.target.value)})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="width" className="text-orange-400">Width</Label>
                      <Input
                        id="width"
                        type="number"
                        min="0"
                        value={dimensions.width}
                        onChange={(e) => setDimensions({...dimensions, width: parseInt(e.target.value)})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height" className="text-orange-400">Height</Label>
                      <Input
                        id="height"
                        type="number"
                        min="0"
                        value={dimensions.height}
                        onChange={(e) => setDimensions({...dimensions, height: parseInt(e.target.value)})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-orange-400 mb-2 block">Rotation (°) - Optional</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Input
                          type="number"
                          min="0"
                          max="360"
                          value={rotation.x}
                          onChange={(e) => setRotation({...rotation, x: parseInt(e.target.value)})}
                          placeholder="X"
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Input
                          type="number"
                          min="0"
                          max="360"
                          value={rotation.y}
                          onChange={(e) => setRotation({...rotation, y: parseInt(e.target.value)})}
                          placeholder="Y"
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Input
                          type="number"
                          min="0"
                          max="360"
                          value={rotation.z}
                          onChange={(e) => setRotation({...rotation, z: parseInt(e.target.value)})}
                          placeholder="Z"
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-orange-400">
                      Estimated Price: ${calculatePrice()}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Final price may vary based on complexity and finishing options
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      onClick={() => setCurrentStep(2)}
                      variant="outline"
                      className="border-gray-600 hover:border-gray-500"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-gray-900 font-semibold">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}