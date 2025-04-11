import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
  Fade,
  Card,
  Grid,
  IconButton,
  CircularProgress,
  Switch,
  FormControlLabel,
  Checkbox,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Zoom,
  Avatar,
  InputAdornment,
  Select,
  MenuItem,
  Link,
} from '@mui/material';
import { useTheme, Theme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Person, Lock, Email } from '@mui/icons-material';

interface FormData {
  height: string;
  age: string;
  unit: 'cm' | 'in';
  weight: string;
  fatherHeight: string;
  motherHeight: string;
  gender: 'male' | 'female';
}

interface PlanCategory {
  title: string;
  description: string;
  icon: string;
  recommendations: Array<{
    title: string;
    description: string;
  }>;
  intensity: number;
  timeline: string;
  schedule?: Array<{
    time?: string;
    day?: string;
    meal?: string;
    focus?: string;
    exercises?: string[];
  }>;
}

interface HeightLog {
  date: string;
  height: number;
  unit: 'cm' | 'in';
}

interface DailyTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

type Step = 'input' | 'analyzing' | 'daily' | 'progress' | 'category' | 'potential' | 'overview' | 'personalized' | 'program' | 'weekly' | 'nutrition' | 'techniques' | 'support';

type Result = {
  currentHeight: number;
  potentialHeight: number;
  growthPotential: number;
  plans: Record<string, PlanCategory>;
};

function App() {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState<Step>('input');
  const [formData, setFormData] = useState<FormData>({
    height: '',
    age: '',
    unit: 'cm',
    weight: '',
    fatherHeight: '',
    motherHeight: '',
    gender: 'male'
  });
  const [result, setResult] = useState<Result | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([
    {
      id: '1',
      title: 'Morning Stretching',
      description: 'Complete 15 minutes of growth-focused stretching',
      completed: false
    },
    {
      id: '2',
      title: 'Protein Intake',
      description: 'Consume 2.0-2.4g protein per kg of body weight',
      completed: false
    },
    {
      id: '3',
      title: 'Sleep Schedule',
      description: 'Maintain 8-10 hours of quality sleep',
      completed: false
    },
    {
      id: '4',
      title: 'Posture Check',
      description: 'Practice proper posture throughout the day',
      completed: false
    },
    {
      id: '5',
      title: 'Growth Plate Stimulation',
      description: 'Perform targeted exercises for growth plate activation',
      completed: false
    },
    {
      id: '6',
      title: 'Nutrition Timing',
      description: 'Follow the recommended meal schedule',
      completed: false
    }
  ]);
  const [heightLogs, setHeightLogs] = useState<HeightLog[]>([]);
  const [showLogDialog, setShowLogDialog] = useState(false);

  // Modern typography styles
  const modernTypographyStyles = {
    h1: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontWeight: 800,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    body1: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      letterSpacing: '-0.01em',
      lineHeight: 1.6,
    },
    button: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontWeight: 600,
      letterSpacing: '-0.01em',
    }
  };

  // Modern button styles
  const modernButtonStyles = {
    contained: {
      background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
      borderRadius: '16px',
      textTransform: 'none',
      fontSize: '1rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      padding: '14px 28px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 0 0 1px rgba(99, 102, 241, 0.1), 0 4px 12px -2px rgba(99, 102, 241, 0.4)',
      '&:hover': {
        background: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)',
        transform: 'translateY(-2px) scale(1.02)',
        boxShadow: '0 0 0 1px rgba(99, 102, 241, 0.2), 0 8px 24px -4px rgba(99, 102, 241, 0.6)',
      },
      '&:active': {
        transform: 'translateY(0) scale(0.98)',
      }
    },
    outlined: {
      borderRadius: '16px',
      textTransform: 'none',
      fontSize: '1rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      padding: '14px 28px',
      borderWidth: '2px',
      borderColor: 'rgba(99, 102, 241, 0.5)',
      color: '#6366F1',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        borderWidth: '2px',
        borderColor: '#6366F1',
        background: 'rgba(99, 102, 241, 0.1)',
        transform: 'translateY(-2px)',
      },
      '&:active': {
        transform: 'translateY(0)',
      }
    }
  };

  const calculatePotentialHeight = (currentHeight: number, age: number) => {
    let growthPotential = 0;
    
    if (age < 8) {
      growthPotential = currentHeight * 1.8;
    } else if (age === 8) {
      growthPotential = currentHeight * 1.65;
    } else if (age === 9) {
      growthPotential = currentHeight * 1.55;
    } else if (age === 10) {
      growthPotential = currentHeight * 1.45;
    } else if (age === 11) {
      growthPotential = currentHeight * 1.4;
    } else if (age === 12) {
      growthPotential = currentHeight * 1.35;
    } else if (age === 13) {
      growthPotential = currentHeight * 1.3;
    } else if (age === 14) {
      growthPotential = currentHeight * 1.25;
    } else if (age === 15) {
      growthPotential = currentHeight * 1.2;
    } else if (age === 16) {
      growthPotential = currentHeight * 1.15;
    } else if (age === 17) {
      growthPotential = currentHeight * 1.12;
    } else if (age === 18) {
      growthPotential = currentHeight * 1.08;
    } else if (age === 19) {
      growthPotential = currentHeight * 1.05;
    } else if (age === 20) {
      growthPotential = currentHeight * 1.03;
    } else {
      growthPotential = currentHeight * 1.02;
    }

    let maxGrowth;
    if (age < 12) {
      maxGrowth = 50;
    } else if (age < 16) {
      maxGrowth = 40;
    } else if (age < 19) {
      maxGrowth = 25;
    } else if (age < 21) {
      maxGrowth = 15;
    } else {
      maxGrowth = 8;
    }

    return Math.min(growthPotential, currentHeight + maxGrowth);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentStep('analyzing');
    setAnalysisProgress(0);

    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      const height = parseFloat(formData.height);
      const age = parseFloat(formData.age);
      const weight = formData.weight ? parseFloat(formData.weight) : null;
      const fatherHeight = formData.fatherHeight ? parseFloat(formData.fatherHeight) : null;
      const motherHeight = formData.motherHeight ? parseFloat(formData.motherHeight) : null;

      let growthPotential = 0;
      if (age < 12) {
        growthPotential = 8 + Math.random() * 4;
      } else if (age < 15) {
        growthPotential = 5 + Math.random() * 5;
      } else if (age < 18) {
        growthPotential = 3 + Math.random() * 4;
      } else if (age < 21) {
        growthPotential = 1 + Math.random() * 2.5;
      } else {
        growthPotential = Math.random() * 2;
      }

      if (fatherHeight && motherHeight) {
        const geneticPotential = ((fatherHeight + motherHeight * 0.923) / 2) - height;
        if (geneticPotential > 0) {
          growthPotential += Math.min(2, geneticPotential * 0.1);
        }
      }

      if (weight && formData.unit === 'cm') {
        const bmi = weight / ((height / 100) * (height / 100));
        if (bmi < 18.5) {
          growthPotential += 1;
        }
      }

      const plans: Record<string, PlanCategory> = {
        nutrition: {
          title: "Elite Nutrition Protocol",
          description: "Scientific nutrition system for maximum growth potential",
          icon: "🧬",
          recommendations: [
            {
              title: 'Advanced protein timing protocol',
              description: '2.0-2.4g per kg for optimal growth'
            },
            {
              title: 'Strategic nutrient partitioning',
              description: 'Optimize nutrient delivery for growth'
            },
            {
              title: 'Growth hormone optimization',
              description: 'Meal timing for maximum HGH production'
            }
          ],
          intensity: 0.9,
          timeline: "Immediate - Long term",
          schedule: [
            { time: "6:00 AM", meal: "Growth Activation Shake" },
            { time: "9:00 AM", meal: "Protein-Dense Breakfast" },
            { time: "12:00 PM", meal: "Growth-Optimized Lunch" },
            { time: "3:00 PM", meal: "Recovery Snack" },
            { time: "6:00 PM", meal: "Hormone-Optimizing Dinner" },
            { time: "9:00 PM", meal: "Night Recovery Formula" }
          ]
        },
        exercise: {
          title: "Advanced Growth Optimization Training",
          description: "Scientifically-designed movement patterns for height maximization",
          icon: "⚡",
          recommendations: [
            {
              title: 'Progressive decompression protocol',
              description: 'Advanced spine lengthening techniques'
            },
            {
              title: 'Growth plate stimulation',
              description: 'Targeted exercises for growth plate activation'
            },
            {
              title: 'Advanced posture correction',
              description: 'Comprehensive alignment optimization'
            }
          ],
          intensity: 0.85,
          timeline: "12-week cycles",
          schedule: [
            { day: "Monday", focus: "Growth Activation", exercises: [
              "Dynamic stretching sequence",
              "Spinal decompression",
              "Posture reset protocol",
              "Growth plate stimulation"
            ]},
            { day: "Tuesday", focus: "Length Development", exercises: [
              "Hanging progressions",
              "Mobility flows",
              "Extension patterns",
              "Recovery techniques"
            ]}
          ]
        },
        lifestyle: {
          title: "Elite Growth Lifestyle System",
          description: "Comprehensive lifestyle optimization for maximum results",
          icon: "💫",
          recommendations: [
            {
              title: 'Advanced sleep optimization',
              description: '8-10 hours of quality sleep with growth optimization'
            },
            {
              title: 'Stress management system',
              description: 'Comprehensive stress reduction techniques'
            },
            {
              title: 'Circadian rhythm optimization',
              description: 'Natural growth hormone maximization'
            }
          ],
          intensity: 0.9,
          timeline: "Ongoing"
        }
      };

      setResult({
        currentHeight: height,
        potentialHeight: height + growthPotential,
        growthPotential,
        plans
      });

      // Initialize height logs
      const logs: HeightLog[] = [
        {
          date: new Date().toISOString().split('T')[0],
          height: height,
          unit: formData.unit
        }
      ];
      setHeightLogs(logs);

      setCurrentStep('potential');
    }, 5000);
  };

  const renderInputStep = () => (
    <Fade in={currentStep === 'input'}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4,
          background: 'rgba(17, 24, 39, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: 3
        }}
      >
        <Stack spacing={4}>
          <Box>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #6366F1 30%, #10B981 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              Height Growth Estimator
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1.1rem',
                lineHeight: 1.6
              }}
            >
              Enter your details below to get a personalized growth plan
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Current Height"
                value={formData.height}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, height: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.08)',
                    },
                    '&.Mui-focused': {
                      background: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#6366F1',
                        borderWidth: '2px',
                      }
                    }
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Select
                        value={formData.unit}
                        onChange={(e: React.ChangeEvent<{ value: unknown }>) => setFormData({ ...formData, unit: e.target.value as 'cm' | 'in' })}
                        sx={{ minWidth: 60 }}
                      >
                        <MenuItem value="cm">cm</MenuItem>
                        <MenuItem value="in">in</MenuItem>
                      </Select>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                value={formData.age}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, age: e.target.value })}
                type="number"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.08)',
                    },
                    '&.Mui-focused': {
                      background: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#6366F1',
                        borderWidth: '2px',
                      }
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Weight"
                value={formData.weight}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, weight: e.target.value })}
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.08)',
                    },
                    '&.Mui-focused': {
                      background: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#6366F1',
                        borderWidth: '2px',
                      }
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                fullWidth
                value={formData.gender}
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
                sx={{
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.08)',
                  },
                  '&.Mui-focused': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#6366F1',
                      borderWidth: '2px',
                    }
                  }
                }}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Father's Height"
                value={formData.fatherHeight}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, fatherHeight: e.target.value })}
                InputProps={{
                  endAdornment: <InputAdornment position="end">{formData.unit}</InputAdornment>,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.08)',
                    },
                    '&.Mui-focused': {
                      background: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#6366F1',
                        borderWidth: '2px',
                      }
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mother's Height"
                value={formData.motherHeight}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, motherHeight: e.target.value })}
                InputProps={{
                  endAdornment: <InputAdornment position="end">{formData.unit}</InputAdornment>,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.08)',
                    },
                    '&.Mui-focused': {
                      background: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#6366F1',
                        borderWidth: '2px',
                      }
                    }
                  }
                }}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={modernButtonStyles.contained}
            >
              Analyze Growth Potential
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Fade>
  );

  const renderAnalyzingStep = () => (
    <Fade in={currentStep === 'analyzing'}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4,
          background: 'rgba(17, 24, 39, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: 3
        }}
      >
        <Stack spacing={3} alignItems="center">
          <CircularProgress 
            size={60}
            sx={{
              color: '#6366F1',
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Analyzing Your Growth Potential
          </Typography>
          <Typography color="text.secondary" align="center">
            Our AI is calculating your maximum height potential based on scientific growth patterns and optimization factors...
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={analysisProgress}
            sx={{
              width: '100%',
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(45deg, #6366F1 30%, #10B981 90%)',
              }
            }}
          />
        </Stack>
      </Paper>
    </Fade>
  );

  const renderPotentialStep = () => (
    <Fade in={currentStep === 'potential'}>
      <Stack spacing={4}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4,
            background: 'rgba(17, 24, 39, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.1), transparent 70%)',
              pointerEvents: 'none'
            }
          }}
        >
          <Stack spacing={4}>
            <Box textAlign="center">
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #60A5FA 30%, #34D399 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2 
                }}
              >
                Your Growth Analysis Results
              </Typography>
              <Typography color="#94A3B8" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
                Based on our advanced AI analysis, we've identified significant potential for height optimization through our specialized program.
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
                <Card sx={{ 
                  p: 3, 
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: 3,
                  minWidth: 240
                }}>
                  <Stack spacing={1} alignItems="center">
                    <Typography variant="overline" sx={{ color: '#94A3B8', letterSpacing: 2 }}>
                      CURRENT HEIGHT
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                      {result?.currentHeight.toFixed(1)} {formData.unit}
                    </Typography>
                  </Stack>
                </Card>

                <Card sx={{ 
                  p: 3, 
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: 3,
                  minWidth: 240,
                  position: 'relative',
                  overflow: 'visible'
                }}>
                  <Box sx={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(45deg, #60A5FA 30%, #34D399 90%)',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: 1,
                    whiteSpace: 'nowrap'
                  }}>
                    ACHIEVABLE WITH OUR PROGRAM
                  </Box>
                  <Stack spacing={1} alignItems="center">
                    <Typography variant="overline" sx={{ color: '#94A3B8', letterSpacing: 2 }}>
                      POTENTIAL HEIGHT
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#10B981' }}>
                      {result?.potentialHeight.toFixed(1)} {formData.unit}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 600 }}>
                      +{result?.growthPotential.toFixed(1)} {formData.unit} potential increase
                    </Typography>
                  </Stack>
                </Card>
              </Box>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Card sx={{ 
                p: 4, 
                background: 'rgba(30, 41, 59, 0.9)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: 3
              }}>
                <Stack spacing={3}>
                  <Box textAlign="center">
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                      Unlock Your Full Height Potential
                    </Typography>
                    <Typography color="#94A3B8" sx={{ mb: 3 }}>
                      Join our premium program to access your personalized height optimization plan
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
                    {[
                      { title: "Personalized Plan", description: "AI-optimized routines based on your genetics", icon: "🎯" },
                      { title: "Expert Guidance", description: "Step-by-step instructions for maximum results", icon: "👨‍🔬" },
                      { title: "Progress Tracking", description: "Monitor your growth journey in real-time", icon: "📊" },
                      { title: "Premium Support", description: "24/7 access to our height optimization experts", icon: "💬" }
                    ].map((feature, index) => (
                      <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                        <Typography sx={{ fontSize: '2rem' }}>{feature.icon}</Typography>
                        <Box>
                          <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                            {feature.description}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.1)' }} />

                  <Box textAlign="center">
                    <Typography variant="h4" sx={{ color: '#10B981', fontWeight: 700, mb: 1 }}>
                      $5.99<Typography component="span" sx={{ fontSize: '1rem', color: '#94A3B8' }}>/week</Typography>
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', mb: 3 }}>
                      Cancel anytime • 7-day money-back guarantee
                    </Typography>
                    
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => {
                        setCurrentStep('program');
                      }}
                      sx={{
                        background: 'linear-gradient(45deg, #60A5FA 30%, #34D399 90%)',
                        boxShadow: '0 8px 24px -4px rgba(96, 165, 250, 0.5)',
                        minWidth: 250,
                        height: 56,
                        fontSize: '1.1rem',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          background: 'linear-gradient(45deg, #3B82F6 30%, #10B981 90%)',
                        }
                      }}
                    >
                      Start Your Growth Journey Now
                    </Button>

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 3 }}>
                      {[
                        { text: "100% Safe & Natural", icon: "🛡️" },
                        { text: "Science-Backed Methods", icon: "🧬" },
                        { text: "Proven Results", icon: "✨" }
                      ].map((item, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography>{item.icon}</Typography>
                          <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                            {item.text}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Stack>
              </Card>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Fade>
  );

  const renderProgramStep = () => (
    <Fade in={currentStep === 'program'}>
      <Box sx={{ 
        minHeight: '100vh',
        background: `linear-gradient(135deg, #030712 0%, #111827 100%)`,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%)',
          pointerEvents: 'none',
          animation: 'pulse 8s ease-in-out infinite'
        },
        '@keyframes pulse': {
          '0%, 100%': {
            opacity: 0.5,
          },
          '50%': {
            opacity: 0.8,
          },
        }
      }}>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Stack spacing={6}>
            <Box textAlign="center">
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #60A5FA 30%, #34D399 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2 
                }}
              >
                Your Growth Program
              </Typography>
              <Typography color="#94A3B8" sx={{ maxWidth: 600, mx: 'auto' }}>
                Choose which aspect of the program you want to focus on today
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {[
                {
                  title: "Daily Protocol",
                  description: "Your daily growth optimization routine",
                  icon: "📅",
                  color: "#60A5FA",
                  onClick: () => setCurrentStep('daily')
                },
                {
                  title: "Weekly Program",
                  description: "Structured weekly growth plan",
                  icon: "📊",
                  color: "#34D399",
                  onClick: () => setCurrentStep('weekly')
                },
                {
                  title: "Nutrition Plan",
                  description: "Growth-optimizing diet and supplements",
                  icon: "🥗",
                  color: "#F59E0B",
                  onClick: () => setCurrentStep('nutrition')
                },
                {
                  title: "Growth Techniques",
                  description: "Advanced height optimization methods",
                  icon: "💪",
                  color: "#8B5CF6",
                  onClick: () => setCurrentStep('techniques')
                },
                {
                  title: "Progress Tracking",
                  description: "Monitor your growth journey",
                  icon: "📈",
                  color: "#EC4899",
                  onClick: () => setCurrentStep('progress')
                },
                {
                  title: "Expert Support",
                  description: "Get help from our specialists",
                  icon: "👨‍🔬",
                  color: "#6366F1",
                  onClick: () => setCurrentStep('support')
                }
              ].map((program, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card 
                    onClick={program.onClick}
                    sx={{ 
                      p: 4,
                      height: '100%',
                      background: 'rgba(30, 41, 59, 0.5)',
                      border: '1px solid rgba(99, 102, 241, 0.2)',
                      borderRadius: 3,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        background: 'rgba(30, 41, 59, 0.7)',
                        border: `1px solid ${program.color}`,
                        boxShadow: `0 8px 24px -4px ${program.color}40`
                      }
                    }}
                  >
                    <Stack spacing={3} alignItems="center" textAlign="center">
                      <Box sx={{ 
                        width: 64, 
                        height: 64, 
                        borderRadius: '50%',
                        background: `${program.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem'
                      }}>
                        {program.icon}
                      </Box>
                      <Box>
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            fontWeight: 700,
                            color: program.color,
                            mb: 1
                          }}
                        >
                          {program.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {program.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </Fade>
  );

  const renderDailyStep = () => (
    <Fade in={currentStep === 'daily'}>
      <Container maxWidth="lg">
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4,
            background: 'rgba(17, 24, 39, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.1), transparent 70%)',
              pointerEvents: 'none'
            }
          }}
        >
          <Stack spacing={4}>
            <Box textAlign="center">
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #60A5FA 30%, #34D399 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2 
                }}
              >
                Your Daily Growth Tasks
              </Typography>
              <Typography color="#94A3B8" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
                Complete these daily tasks to maximize your growth potential
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {dailyTasks.map((task, index) => (
                <Grid item xs={12} sm={6} key={task.id}>
                  <Card 
                    sx={{ 
                      p: 3,
                      background: 'rgba(30, 41, 59, 0.5)',
                      border: '1px solid rgba(99, 102, 241, 0.2)',
                      '&:hover': {
                        background: 'rgba(30, 41, 59, 0.7)',
                        transform: 'translateY(-2px)',
                        transition: 'all 0.3s ease'
                      }
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Checkbox
                        checked={task.completed}
                        onChange={() => {
                          const newTasks = [...dailyTasks];
                          newTasks[index].completed = !newTasks[index].completed;
                          setDailyTasks(newTasks);
                        }}
                        sx={{
                          color: '#6366F1',
                          '&.Mui-checked': {
                            color: '#6366F1',
                          },
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ color: '#60A5FA' }}>
                          {task.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {task.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
              <Button
                variant="contained"
                onClick={() => setCurrentStep('progress')}
                sx={modernButtonStyles.contained}
              >
                Track Your Progress
              </Button>
              <Button
                variant="outlined"
                onClick={() => setCurrentStep('personalized')}
                sx={modernButtonStyles.outlined}
              >
                Back to Plan
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Fade>
  );

  const renderWeeklyStep = () => (
    <Fade in={currentStep === 'weekly'}>
      {/* Weekly step content */}
    </Fade>
  );

  const renderNutritionStep = () => (
    <Fade in={currentStep === 'nutrition'}>
      {/* Nutrition step content */}
    </Fade>
  );

  const renderTechniquesStep = () => (
    <Fade in={currentStep === 'techniques'}>
      {/* Techniques step content */}
    </Fade>
  );

  const renderProgressStep = () => (
    <Fade in={currentStep === 'progress'}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4,
          background: 'rgba(17, 24, 39, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: 3
        }}
      >
        <Stack spacing={4}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Your Progress
          </Typography>
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={heightLogs}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Line type="monotone" dataKey="height" stroke="#6366F1" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
          <Button
            variant="contained"
            onClick={() => setCurrentStep('category')}
            sx={modernButtonStyles.contained}
          >
            View Categories
          </Button>
        </Stack>
      </Paper>
    </Fade>
  );

  const renderSupportStep = () => (
    <Fade in={currentStep === 'support'}>
      {/* Support step content */}
    </Fade>
  );

  return (
    <Box 
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, #030712 0%, #111827 100%)`,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%)',
          pointerEvents: 'none',
          animation: 'pulse 8s ease-in-out infinite'
        },
        '@keyframes pulse': {
          '0%, 100%': {
            opacity: 0.5,
          },
          '50%': {
            opacity: 0.8,
          },
        }
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* Top Navigation Bar */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 6
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
            }}>
              <Box 
                sx={{
                  background: 'linear-gradient(135deg, #6366F1, #10B981)',
                  borderRadius: '12px',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px -4px rgba(99, 102, 241, 0.3)'
                }}
              >
                <Typography 
                  sx={{ 
                    fontSize: '1.8rem', 
                    fontWeight: 800,
                    color: '#fff',
                    lineHeight: 1
                  }}
                >
                  T
                </Typography>
              </Box>
              <Typography 
                sx={{ 
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #6366F1, #10B981)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Taller.AI
              </Typography>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              gap: 4, 
              alignItems: 'center'
            }}>
              <Link 
                href="#" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  '&:hover': { color: '#fff' }
                }}
              >
                Success Stories
              </Link>
              <Link 
                href="#" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  '&:hover': { color: '#fff' }
                }}
              >
                How It Works
              </Link>
              <Button
                variant="outlined"
                sx={{
                  borderColor: 'rgba(99, 102, 241, 0.5)',
                  color: '#fff',
                  borderRadius: '12px',
                  px: 3,
                  '&:hover': {
                    borderColor: '#6366F1',
                    background: 'rgba(99, 102, 241, 0.1)'
                  }
                }}
              >
                Login
              </Button>
            </Box>
          </Box>

          {/* Hero Section */}
          {currentStep === 'input' && (
            <Box sx={{ textAlign: 'center', mb: 8, mt: 4 }}>
              <Typography 
                variant="h1" 
                sx={{ 
                  ...modernTypographyStyles.h1,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                  lineHeight: 1.1,
                  background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 50%, #10B981 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3,
                  maxWidth: '1000px',
                  mx: 'auto',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-16px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '120px',
                    height: '4px',
                    background: 'linear-gradient(90deg, #6366F1, #10B981)',
                    borderRadius: '2px'
                  }
                }}
              >
                Maximize Your Height Potential
              </Typography>
              <Typography 
                sx={{ 
                  ...modernTypographyStyles.body1,
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  color: 'rgba(255, 255, 255, 0.8)',
                  maxWidth: '800px',
                  mx: 'auto',
                  mb: 6,
                  lineHeight: 1.6
                }}
              >
                Join over 50,000 success stories who have achieved their height goals with our AI-powered optimization system. Start your transformation today.
              </Typography>

              {/* Stats Section */}
              <Box 
                sx={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  gap: { xs: 3, md: 6 },
                  flexWrap: 'wrap',
                  mb: 6
                }}
              >
                {[
                  { number: '50K+', label: 'Success Stories' },
                  { number: '92%', label: 'Success Rate' },
                  { number: '4.9/5', label: 'User Rating' },
                  { number: '2-6"', label: 'Avg. Growth' }
                ].map((stat, index) => (
                  <Box 
                    key={index}
                    sx={{
                      textAlign: 'center',
                      animation: 'fadeInUp 0.5s ease-out',
                      animationDelay: `${index * 0.1}s`,
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '16px',
                      px: 4,
                      py: 2,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(99, 102, 241, 0.3)'
                      }
                    }}
                  >
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        fontWeight: 700,
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        background: 'linear-gradient(135deg, #6366F1, #10B981)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '0.9rem',
                        fontWeight: 500
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Trust Badges */}
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'center',
                gap: { xs: 2, md: 4 },
                flexWrap: 'wrap'
              }}>
                {[
                  { icon: '🔒', text: 'HIPAA Compliant' },
                  { icon: '🧬', text: 'Scientifically Proven' },
                  { icon: '⚡', text: 'Real-Time AI Analysis' },
                  { icon: '✨', text: 'Natural Methods' }
                ].map((badge, index) => (
                  <Box 
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '12px',
                      px: 2,
                      py: 1,
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <Typography sx={{ fontSize: '1.2rem' }}>{badge.icon}</Typography>
                    <Typography 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '0.875rem',
                        fontWeight: 500
                      }}
                    >
                      {badge.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Main Content */}
          {currentStep === 'input' && renderInputStep()}
          {currentStep === 'analyzing' && renderAnalyzingStep()}
          {currentStep === 'potential' && renderPotentialStep()}
          {currentStep === 'program' && renderProgramStep()}
          {currentStep === 'daily' && renderDailyStep()}
          {currentStep === 'weekly' && renderWeeklyStep()}
          {currentStep === 'nutrition' && renderNutritionStep()}
          {currentStep === 'techniques' && renderTechniquesStep()}
          {currentStep === 'progress' && renderProgressStep()}
          {currentStep === 'support' && renderSupportStep()}

          {/* Footer */}
          <Box 
            sx={{ 
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              background: 'rgba(17, 24, 39, 0.9)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(99, 102, 241, 0.2)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 1000
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box 
                component="img"
                src="/taller-ai-logo.png"
                alt="Taller.AI"
                sx={{ 
                  height: 24,
                  filter: 'brightness(0) invert(1)',
                  opacity: 0.8
                }}
              />
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                © 2024 Taller.AI - All rights reserved
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link href="#" sx={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', '&:hover': { color: '#fff' } }}>
                Privacy Policy
              </Link>
              <Link href="#" sx={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', '&:hover': { color: '#fff' } }}>
                Terms of Service
              </Link>
              <Link href="#" sx={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', '&:hover': { color: '#fff' } }}>
                Contact
              </Link>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default App;
