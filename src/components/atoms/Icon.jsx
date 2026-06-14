import {
  Leaf,
  Shield,
  Flower2,
  Heart,
  Users,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon,
  Download,
  ArrowRight,
  Star,
  Sprout,
  TreePine,
  Swords,
  Brain,
  Eye,
  Target,
  Award,
  Clock,
  MessageCircle,
  Facebook,
  Instagram,
  Play,
  Check,
  CircleDollarSign,
  Pencil,
  Image as ImageIcon,
  Upload,
  Save,
  LogOut,
  FolderOpen,
  Music2,
} from 'lucide-react';

const iconMap = {
  leaf: Leaf,
  shield: Shield,
  flower: Flower2,
  heart: Heart,
  users: Users,
  calendar: Calendar,
  'map-pin': MapPin,
  phone: Phone,
  mail: Mail,
  'external-link': ExternalLink,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  menu: Menu,
  x: X,
  sun: Sun,
  moon: Moon,
  download: Download,
  'arrow-right': ArrowRight,
  star: Star,
  sprout: Sprout,
  tree: TreePine,
  swords: Swords,
  brain: Brain,
  eye: Eye,
  target: Target,
  award: Award,
  clock: Clock,
  message: MessageCircle,
  facebook: Facebook,
  instagram: Instagram,
  play: Play,
  check: Check,
  'circle-dollar': CircleDollarSign,
  pencil: Pencil,
  image: ImageIcon,
  upload: Upload,
  save: Save,
  logout: LogOut,
  folder: FolderOpen,
  tiktok: Music2,
};

export default function Icon({
  name,
  size = 24,
  className = '',
  strokeWidth = 1.5,
  ...props
}) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;

  return (
    <IconComponent
      size={size}
      className={className}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
}
