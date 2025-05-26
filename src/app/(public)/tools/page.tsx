'use client';
import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Coins, Type, Ruler, Image, Link2, FileJson } from 'lucide-react';

export default function ToolsPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  
  // Currency Converter
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  
  // Text Converter
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  
  // Measurements Converter
  const [measurementType, setMeasurementType] = useState('');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [measurementAmount, setMeasurementAmount] = useState(1);
  const [convertedMeasurement, setConvertedMeasurement] = useState<number | null>(null);

  // URL Shortener
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  // JSON Converter
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  
  // Currency Converter
  const handleCurrencyConvert = async () => {
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const data = await response.json();
      const rate = data.rates[toCurrency];
      setConvertedAmount(amount * rate);
    } catch (error) {
      console.error("Erro ao converter moeda:", error);
      alert("Erro ao converter moeda. Verifique sua conexão e tente novamente.");
    }
  };
  
  // Text Converter
  const handleTextConvert = (type: string) => {
    switch (type) {
      case 'uppercase':
        setOutputText(inputText.toUpperCase());
        break;
      case 'lowercase':
        setOutputText(inputText.toLowerCase());
        break;
      case 'capitalize':
        setOutputText(inputText.replace(/\b\w/g, (l) => l.toUpperCase()));
        break;
      default:
        setOutputText(inputText);
    }
  };
  
  // Measurements Converter
  const handleMeasurementConvert = () => {
    let result = measurementAmount;
    
    // Length conversions
    if (measurementType === 'length') {
      const toMeters = {
        m: 1,
        cm: 0.01,
        km: 1000,
        inch: 0.0254,
        ft: 0.3048,
      };
      
      const fromMeters = {
        m: 1,
        cm: 100,
        km: 0.001,
        inch: 39.3701,
        ft: 3.28084,
      };
      
      result = measurementAmount * toMeters[fromUnit as keyof typeof toMeters];
      result = result * fromMeters[toUnit as keyof typeof fromMeters];
    }
    
    // Weight conversions
    if (measurementType === 'weight') {
      const toKilograms = {
        kg: 1,
        g: 0.001,
        lb: 0.453592,
        oz: 0.0283495,
      };
      
      const fromKilograms = {
        kg: 1,
        g: 1000,
        lb: 2.20462,
        oz: 35.274,
      };
      
      result = measurementAmount * toKilograms[fromUnit as keyof typeof toKilograms];
      result = result * fromKilograms[toUnit as keyof typeof fromKilograms];
    }
    
    // Volume conversions
    if (measurementType === 'volume') {
      const toLiters = {
        l: 1,
        ml: 0.001,
        gal: 3.78541,
        cup: 0.236588,
      };
      
      const fromLiters = {
        l: 1,
        ml: 1000,
        gal: 0.264172,
        cup: 4.22675,
      };
      
      result = measurementAmount * toLiters[fromUnit as keyof typeof toLiters];
      result = result * fromLiters[toUnit as keyof typeof fromLiters];
    }
    
    setConvertedMeasurement(result);
  };

  // URL Shortener
  const handleShortenUrl = async () => {
    try {
      const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${longUrl}`);
      const data = await response.json();
      if (data.ok) {
        setShortUrl(data.result.short_link);
      } else {
        alert("Erro ao encurtar URL. Verifique se a URL é válida e tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao encurtar URL:", error);
      alert("Erro ao encurtar URL. Verifique sua conexão e tente novamente.");
    }
  };

  // JSON Converter
  const handleJsonConvert = (type: string) => {
    try {
      if (type === 'format') {
        const formattedJson = JSON.stringify(JSON.parse(jsonInput), null, 2);
        setJsonOutput(formattedJson);
      } else if (type === 'minify') {
        const minifiedJson = JSON.stringify(JSON.parse(jsonInput));
        setJsonOutput(minifiedJson);
      }
    } catch (error) {
      console.error("Erro ao converter JSON:", error);
      alert("Erro ao converter JSON. Verifique se o JSON é válido e tente novamente.");
      setJsonOutput('');
    }
  };

  const tools = [
    {
      id: 'currency',
      title: 'Conversor de Moedas',
      description: 'Converta valores entre diferentes moedas usando taxas de câmbio atualizadas.',
      icon: <Coins className="h-10 w-10 text-primary" />
    },
    {
      id: 'text',
      title: 'Conversor de Texto',
      description: 'Transforme seu texto em maiúsculas, minúsculas ou capitalize cada palavra.',
      icon: <Type className="h-10 w-10 text-primary" />
    },
    {
      id: 'measurement',
      title: 'Conversor de Medidas',
      description: 'Converta facilmente entre diferentes unidades de comprimento, peso e volume.',
      icon: <Ruler className="h-10 w-10 text-primary" />
    },
    {
      id: 'image',
      title: 'Conversor de Imagem',
      description: 'Ferramentas para converter e redimensionar imagens (em desenvolvimento).',
      icon: <Image className="h-10 w-10 text-primary" />
    },
    {
      id: 'url',
      title: 'Encurtador de Links',
      description: 'Crie links curtos e compartilháveis a partir de URLs longas.',
      icon: <Link2 className="h-10 w-10 text-primary" />
    },
    {
      id: 'json',
      title: 'Conversor JSON',
      description: 'Formate, valide e minifique seu código JSON para melhor legibilidade.',
      icon: <FileJson className="h-10 w-10 text-primary" />
    },
  ];

  const CurrencyConverter = () => {
    const defaultCurrencys = [
      { value: 'USD', label: 'Dólar (USD)' },
      { value: 'BRL', label: 'Real (BRL)' },
      { value: 'EUR', label: 'Euro (EUR)' },
      { value: 'GBP', label: 'Libra (GBP)' },
    ];

    return (
      <Dialog 
        open={openModal === 'currency'} 
        onOpenChange={() => setOpenModal(openModal === 'currency' ? null : 'currency')}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-gray-800">Conversor de Moedas</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fromCurrency" className="text-gray-800">De</Label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Moeda" />
                  </SelectTrigger>
                  <SelectContent>
                    {defaultCurrencys.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="toCurrency" className="text-gray-800">Para</Label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Moeda" />
                  </SelectTrigger>
                  <SelectContent>
                    {defaultCurrencys.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-gray-800">Valor</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
              />
            </div>
            
            <Button onClick={handleCurrencyConvert}>Converter</Button>
            
            {convertedAmount !== null && (
              <div className="mt-4 p-4 bg-muted rounded-lg text-gray-800">
                <p className="text-center">
                  {amount} {fromCurrency} = <span className="font-bold">{convertedAmount.toFixed(2)}</span> {toCurrency}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const ShowTools = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Card key={tool.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              {tool.icon}
              <CardTitle>{tool.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{tool.description}</p>
              <Button 
                onClick={() => setOpenModal(tool.id)}
                className="w-full"
              >
                Abrir Ferramenta
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const TextConverter = () => {
    return (
      <Dialog 
        open={openModal === 'text'} 
        onOpenChange={() => setOpenModal(openModal === 'text' ? null : 'text')}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-gray-800">Conversor de Texto</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="inputText" className="text-gray-800">Texto</Label>
              <Input
                id="inputText"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={() => handleTextConvert('uppercase')}>Maiúsculas</Button>
              <Button onClick={() => handleTextConvert('lowercase')}>Minúsculas</Button>
              <Button onClick={() => handleTextConvert('capitalize')}>Capitalizar</Button>
            </div>
            
            {outputText && (
              <div className="mt-4 p-4 bg-muted rounded-lg text-gray-800">
                <Label className="mb-2 block">Resultado:</Label>
                <p>{outputText}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const MeasurementsConverter = () => {
    return (
      <Dialog 
        open={openModal === 'measurement'} 
        onOpenChange={() => setOpenModal(openModal === 'measurement' ? null : 'measurement')}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-gray-800">Conversor de Medidas</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="measurementType" className="text-gray-800">Tipo de Medida</Label>
              <Select value={measurementType} onValueChange={setMeasurementType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um tipo de medida" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="length">Comprimento</SelectItem>
                  <SelectItem value="weight">Peso</SelectItem>
                  <SelectItem value="volume">Volume</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {measurementType && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromUnit" className="text-gray-800">De</Label>
                    <Select value={fromUnit} onValueChange={setFromUnit}>
                      <SelectTrigger>
                        <SelectValue placeholder="Unidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {measurementType === 'length' && (
                          <>
                            <SelectItem value="m">Metro (m)</SelectItem>
                            <SelectItem value="cm">Centímetro (cm)</SelectItem>
                            <SelectItem value="km">Kilômetro (km)</SelectItem>
                            <SelectItem value="inch">Polegada (in)</SelectItem>
                            <SelectItem value="ft">Pé (ft)</SelectItem>
                          </>
                        )}
                        {measurementType === 'weight' && (
                          <>
                            <SelectItem value="kg">Kilograma (kg)</SelectItem>
                            <SelectItem value="g">Grama (g)</SelectItem>
                            <SelectItem value="lb">Libra (lb)</SelectItem>
                            <SelectItem value="oz">Onça (oz)</SelectItem>
                          </>
                        )}
                        {measurementType === 'volume' && (
                          <>
                            <SelectItem value="l">Litro (l)</SelectItem>
                            <SelectItem value="ml">Mililitro (ml)</SelectItem>
                            <SelectItem value="gal">Galão (gal)</SelectItem>
                            <SelectItem value="cup">Xícara (cup)</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="toUnit" className="text-gray-800">Para</Label>
                    <Select value={toUnit} onValueChange={setToUnit}>
                      <SelectTrigger>
                        <SelectValue placeholder="Unidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {measurementType === 'length' && (
                          <>
                            <SelectItem value="m">Metro (m)</SelectItem>
                            <SelectItem value="cm">Centímetro (cm)</SelectItem>
                            <SelectItem value="km">Kilômetro (km)</SelectItem>
                            <SelectItem value="inch">Polegada (in)</SelectItem>
                            <SelectItem value="ft">Pé (ft)</SelectItem>
                          </>
                        )}
                        {measurementType === 'weight' && (
                          <>
                            <SelectItem value="kg">Kilograma (kg)</SelectItem>
                            <SelectItem value="g">Grama (g)</SelectItem>
                            <SelectItem value="lb">Libra (lb)</SelectItem>
                            <SelectItem value="oz">Onça (oz)</SelectItem>
                          </>
                        )}
                        {measurementType === 'volume' && (
                          <>
                            <SelectItem value="l">Litro (l)</SelectItem>
                            <SelectItem value="ml">Mililitro (ml)</SelectItem>
                            <SelectItem value="gal">Galão (gal)</SelectItem>
                            <SelectItem value="cup">Xícara (cup)</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="measurementAmount" className="text-gray-800">Valor</Label>
                  <Input
                    id="measurementAmount"
                    type="number"
                    value={measurementAmount}
                    onChange={(e) => setMeasurementAmount(Number(e.target.value) || 0)}
                  />
                </div>
                
                <Button onClick={handleMeasurementConvert}>Converter</Button>
                
                {convertedMeasurement !== null && (
                  <div className="mt-4 p-4 bg-muted rounded-lg text-gray-800">
                    <p className="text-center">
                      {measurementAmount} {fromUnit} = <span className="font-bold">{convertedMeasurement.toFixed(4)}</span> {toUnit}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const ImageConverter = () => {
    return (
      <Dialog 
        open={openModal === 'image'}
        onOpenChange={() => setOpenModal(openModal === 'image' ? null : 'image')}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-gray-800">Conversor de Imagem</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4 text-gray-800">
            <Label className="block">Recurso em desenvolvimento.</Label>
            <p>Esta funcionalidade estará disponível em breve.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const UrlShortener = () => {
    return (
      <Dialog open={openModal === 'url'} onOpenChange={() => setOpenModal(openModal === 'url' ? null : 'url')}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-gray-800">Encurtador de Links</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="longUrl" className="text-gray-800">URL Original</Label>
              <Input
                id="longUrl"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="https://exemplo.com/url-muito-longa-para-encurtar"
              />
            </div>
            
            <Button onClick={handleShortenUrl} disabled={!longUrl}>Encurtar URL</Button>
            
            {shortUrl && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <Label className="mb-2 block text-gray-800">URL Encurtada:</Label>
                <div className="flex">
                  <Input readOnly value={shortUrl} className="text-gray-800" />
                  <Button 
                    variant="outline" 
                    className="ml-2"
                    onClick={() => navigator.clipboard.writeText(shortUrl)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const JsonConverter = () => {
    return (
      <Dialog 
        open={openModal === 'json'} 
        onOpenChange={() => setOpenModal(openModal === 'json' ? null : 'json')}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-gray-800">Conversor JSON</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="jsonInput" className="text-gray-800">Entrada JSON</Label>
              <textarea 
                id="jsonInput"
                className="w-full min-h-[150px] rounded-md border border-input p-2 text-gray-800"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='{"exemplo": "valor"}'
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={() => handleJsonConvert('format')}>Formatar</Button>
              <Button onClick={() => handleJsonConvert('minify')}>Minificar</Button>
            </div>
            
            {jsonOutput && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <Label className="mb-2 block text-gray-800">Resultado:</Label>
                <textarea 
                  className="w-full min-h-[150px] rounded-md border border-input p-2 text-gray-800"
                  value={jsonOutput}
                  readOnly
                />
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => navigator.clipboard.writeText(jsonOutput)}
                >
                  <Copy className="h-4 w-4 mr-2" /> Copiar
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Ferramentas</h1>
      <ShowTools />
      <CurrencyConverter />
      <TextConverter />
      <MeasurementsConverter />
      <ImageConverter />
      <UrlShortener />
      <JsonConverter />
    </>
  );
};
