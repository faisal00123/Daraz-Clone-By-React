import { useState, useEffect, useMemo, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'motion/react';
import { SearchIcon } from 'lucide-react';
import useDebounce from '@/hooks/use-debounce';
import { InputGroup } from './input-group';
import { Link } from '@tanstack/react-router';
import { Label } from 'radix-ui';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

interface Action {
  id: string;
  label: string;
  description?: string;
  short?: string;
  end?: string;
}

interface SearchResult {
  actions: Action[];
}

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: 'auto',
      transition: {
        height: { duration: 0.4 },
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 },
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  },
} as const;

const allActionsSample = [
  {
    id: '1',
    label: "Men's clothing",
  },
  {
    id: '2',
    label: "Women's clothing",
  },
  {
    id: '3',
    label: 'Jewelery',
  },
  {
    id: '4',
    label: 'Electronics',
  },
];

function ActionSearchBar({
  actions = allActionsSample,
  defaultOpen = false,
}: {
  actions?: Action[];
  defaultOpen?: boolean;
}) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isFocused, setIsFocused] = useState(defaultOpen);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debouncedQuery = useDebounce(query, 200);

  const filteredActions = useMemo(() => {
    if (!debouncedQuery) return actions;

    const normalizedQuery = debouncedQuery.toLowerCase().trim();
    return actions.filter((action) => {
      const searchableText =
        `${action.label} ${action.description || ''}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });
  }, [debouncedQuery, actions]);

  useEffect(() => {
    if (!isFocused) {
      setResult(null);
      setActiveIndex(-1);
      return;
    }

    setResult({ actions: filteredActions });
    setActiveIndex(-1);
  }, [filteredActions, isFocused]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setIsTyping(true);
      setActiveIndex(-1);
    },
    [],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!result?.actions.length) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < result.actions.length - 1 ? prev + 1 : 0,
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : result.actions.length - 1,
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (activeIndex >= 0 && result.actions[activeIndex]) {
            setSelectedAction(result.actions[activeIndex]);
          }
          break;
        case 'Escape':
          setIsFocused(false);
          setActiveIndex(-1);
          break;
      }
    },
    [result?.actions, activeIndex],
  );

  const handleActionClick = useCallback((action: Action) => {
    setSelectedAction(action);
  }, []);

  const handleFocus = useCallback(() => {
    setSelectedAction(null);
    setIsFocused(true);
    setActiveIndex(-1);
  }, []);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      setIsFocused(false);
      setActiveIndex(-1);
    }, 200);
  }, []);

  return (
    <Popover open={isFocused && !!result && !selectedAction}>
      <PopoverTrigger asChild>
        <InputGroup className="relative pl-3 pr-9 bg-accent-foreground text-sm rounded-lg focus-visible:ring-offset-0">
          <SearchIcon />
          <Input
            type="text"
            placeholder="Search in Daraz"
            value={query}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            role="combobox"
            aria-expanded={isFocused && !!result}
            aria-autocomplete="list"
            aria-activedescendant={
              activeIndex >= 0
                ? `action-${result?.actions[activeIndex]?.id}`
                : undefined
            }
            id="search"
            autoComplete="on"
            className="focus-visible:ring-0 border-none"
          />
        </InputGroup>
      </PopoverTrigger>

      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0 rounded-md shadow-lg overflow-hidden dark:border-gray-800 bg-white dark:bg-black"
        align="start"
        sideOffset={4}
      >
        <AnimatePresence>
          <motion.ul
            role="listbox"
            variants={ANIMATION_VARIANTS.container}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {result?.actions.map((action, index) => (
              <motion.li
                key={action.id}
                id={`action-${action.id}`}
                className={`px-3 py-2 flex items-center justify-between hover:bg-gray-200 dark:hover:bg-zinc-900 cursor-pointer ${
                  activeIndex === index ? 'bg-gray-100 dark:bg-zinc-800' : ''
                }`}
                variants={ANIMATION_VARIANTS.item}
                layout
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleActionClick(action)}
                role="option"
                aria-selected={activeIndex === index}
              >
                <div className="flex items-center gap-2">
                  <Link
                    to="/categories/$id"
                    params={{ id: action.label }}
                    className="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    {action.label}
                  </Link>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
}

export default ActionSearchBar;
